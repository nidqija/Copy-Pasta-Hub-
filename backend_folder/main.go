package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

// ==============================structs for json response and posts table==================================//

type Post struct {
	ID      int    `json:"id"`
	Message string `json:"message"`
}

// creating a struct for users table //
// this is for when we will implement user registration and login functionality //

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}


// ======================================== sign up ======================================================//
func signUp(w http.ResponseWriter, r *http.Request, dbpool *pgxpool.Pool) {

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	} else {
		var user User

		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		} else {
			hashedPassword, err := hashPassword(user.Password)
			if err != nil {
				http.Error(w, "Failed to hash password", http.StatusInternalServerError)
				return
			}

			InsertQuery := `INSERT INTO users (username , email , password) VALUES ($1 , $2 , $3) RETURNING id;`
			_, err = dbpool.Exec(context.Background(), InsertQuery, user.Username, user.Email, hashedPassword)

			if err != nil {
				http.Error(w, "Failed to insert user", http.StatusInternalServerError)
				return
			} else {
				w.WriteHeader(http.StatusCreated)
				w.Write([]byte("User registered successfully"))
			}
		}
	}
}

// ============================================================================================================== //




// ====================================== handle sign in ======================================================= //

func handleSignIn(w http.ResponseWriter, r *http.Request, dbpool *pgxpool.Pool) {

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusBadRequest)
		return
	} else {
		var user User
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		} else {
			SignInQuery := `SELECT id, username, email, password FROM users WHERE email = $1;`
			var dbUser User
			err = dbpool.QueryRow(context.Background(), SignInQuery, user.Email).Scan(&dbUser.ID, &dbUser.Username, &dbUser.Email, &dbUser.Password)

			if err != nil {
				http.Error(w, "Invalid credentials", http.StatusUnauthorized)
				return
			} 

			err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))

			if err != nil {
				http.Error(w, "Invalid credentials", http.StatusUnauthorized)
				return
			}


			w.WriteHeader(http.StatusOK)
			w.Write([]byte("User logged in successfully"))

		}
	}
}

// ===============================================================================================================================//






//============================================function to get posts from posts table=============================================//

// function to hash password before storing in database //
func hashPassword(password string) (string, error) {

	// generate hashed password using bcrypt //
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	} else {
		// return hashed password as string //
		return string(bytes), nil
	}

}





func getPosts(w http.ResponseWriter, r *http.Request, dbpool *pgxpool.Pool) {

	w.Header().Set("Content-Type", "application/json")
	PostTableQuery := `SELECT id, message FROM posts;`

	rows, err := dbpool.Query(context.Background(), PostTableQuery)

	if err != nil {
		log.Fatalf("Unable to query post table: %v\n ", err)
	} else if rows != nil {
		log.Println("Post table queried successfully!")
	}

	defer rows.Close()

	var posts []Post

	for rows.Next() {
		var post Post
		if err := rows.Scan(&post.ID, &post.Message); err != nil {
			http.Error(w, "Failed to scan row", http.StatusInternalServerError)
			return
		}

		
		posts = append(posts, post)
	}

	if posts == nil {
		posts = []Post{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}





// ========================================= function to insert post into posts table ========================================= //

func handleInsertPost(w http.ResponseWriter, r *http.Request, dbpool *pgxpool.Pool) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return

	} else {
		var post Post
		err := json.NewDecoder(r.Body).Decode(&post)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		} else {
			InsertQuery := `INSERT INTO posts (message ,) VALUES ($1);`
			_, err := dbpool.Exec(context.Background(), InsertQuery, post.Message)
			if err != nil {
				http.Error(w, "Failed to insert post", http.StatusInternalServerError)
				return
			} else {
				w.WriteHeader(http.StatusCreated)
				w.Write([]byte("Post inserted successfully"))
			}
		}
	}
}



//==================================================main function ========================================================//

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file , hello")
	}

	dbUser := os.Getenv("POSTGRES_USER")
	dbPass := os.Getenv("POSTGRES_PASS")
	dbName := os.Getenv("POSTGRES_NAME")
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPort := os.Getenv("POSTGRES_PORT")

	databaseUrl := "postgres://" + dbUser + ":" + dbPass + "@" + dbHost + ":" + dbPort + "/" + dbName

	dbpool, err := pgxpool.New(context.Background(), databaseUrl)

	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	} else {
		log.Println("Connected to database successfully!")
	}

	defer dbpool.Close()

	// ====== create posts table if not exists ======= //

	PostTableCreate := `
	  CREATE TABLE IF NOT EXISTS posts (
	     id SERIAL PRIMARY KEY,
		 copypasta_title TEXT NOT NULL,
		 copypasta_desc TEXT NOT NULL,
		 copypasta_category TEXT NOT NULL
		 
		 )`

	_, err = dbpool.Exec(context.Background(), PostTableCreate)

	if err != nil {
		log.Fatalf("Unable to create post table: %v\n ", err)
	} else {
		log.Println("Post table created successfully!")
	}

	UserTableCreate := `
	  CREATE TABLE IF NOT EXISTS users (
	     id SERIAL PRIMARY KEY,
		 username TEXT NOT NULL,
		 email TEXT NOT NULL,
		 password TEXT NOT NULL
		 )`

	_, err = dbpool.Exec(context.Background(), UserTableCreate)

	if err != nil {
		log.Fatalf("Unable to create user table: %v\n ", err)
	} else {
		log.Println("User table created successfully!")
	}

	//=========================

	http.HandleFunc("/api/posts", func(w http.ResponseWriter, r *http.Request) {
		getPosts(w, r, dbpool)
	})

	http.HandleFunc("/api/insertposts", func(w http.ResponseWriter, r *http.Request) {
		handleInsertPost(w, r, dbpool)
	})

	http.HandleFunc("/api/signin" , func(w http.ResponseWriter, r *http.Request){
		handleSignIn(w, r, dbpool)
	})

	http.HandleFunc("/api/signup" , func(w http.ResponseWriter , r *http.Request){
		signUp(w , r, dbpool)
	})
		

	log.Println("server running at localhost :8080")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
}
