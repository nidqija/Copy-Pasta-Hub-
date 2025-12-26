package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

// ==============================structs for json response and posts table==================================//




type Post struct {
	ID int `json:"id"`
	Message string `json:"message"`
}



//============================================function to get posts from posts table=============================================//


func getPosts(w http.ResponseWriter , r *http.Request , dbpool *pgxpool.Pool){

	w.Header().Set("Content-Type", "application/json")
	PostTableQuery := `SELECT id, message FROM posts;`

	
	rows , err := dbpool.Query(context.Background(), PostTableQuery)

	if ( err != nil ){
		log.Fatalf("Unable to query post table: %v\n " , err)
	} else if rows != nil{
		log.Println("Post table queried successfully!")
	}

	defer rows.Close()

	var posts []Post

	for rows.Next(){
		var post Post
	     if	err := rows.Scan(&post.ID , &post.Message); err != nil {
			http.Error(w , "Failed to scan row" , http.StatusInternalServerError)
			return 
		} 
			posts = append(posts, post)
	}

	w.Header().Set("Content-Type" , "application/json")
	json.NewEncoder(w).Encode(posts)
}

/*
func handleInsert(w http.ResponseWriter , r *http.Request , dbpool *pgxpool.Pool){
    if r.Method != http.MethodPost{
		http.Error(w , "Method not allowed" , http.StatusMethodNotAllowed);
		return 
	} else {

	}
}
*/


//============================================================================================================================//

func main(){

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

	dbpool , err := pgxpool.New(context.Background() , databaseUrl)

	if err!= nil {
		log.Fatalf("Unable to connect to database: %v\n" , err)
	} else {
		log.Println("Connected to database successfully!")
	}

	defer dbpool.Close()

// ====== create posts table if not exists ======= //

	PostTableCreate := `
	  CREATE TABLE IF NOT EXISTS posts (
	     id SERIAL PRIMARY KEY,
		 message TEXT NOT NULL
		 
		 )`;

		 _,err = dbpool.Exec(context.Background(), PostTableCreate);

		 if ( err != nil){
			log.Fatalf("Unable to create post table: %v\n " , err)
		 } else {
			log.Println("Post table created successfully!")
		 }


	UserTableCreate := `
	  CREATE TABLE IF NOT EXISTS users (
	     id SERIAL PRIMARY KEY,
		 username TEXT NOT NULL,
		 email TEXT NOT NULL,
		 password TEXT NOT NULL
		 )`;
		 
		 _,err = dbpool.Exec(context.Background(),UserTableCreate);

		 if ( err != nil){
			log.Fatalf("Unable to create user table: %v\n " , err)
		 } else {
			log.Println("User table created successfully!");
		 }



		

		


//=========================


	

	

	



	http.HandleFunc("/api/posts" , func(w http.ResponseWriter , r *http.Request) {
		getPosts(w , r , dbpool)
	} )

	log.Println("server running at localhost :8080")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080" , nil))
}