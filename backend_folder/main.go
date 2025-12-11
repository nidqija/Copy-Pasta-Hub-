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


type Response struct {
	Message string `json:"message"`
}


func handlerRequest(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type" , "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Hello, Skibidi!"})
}


func main(){

	err := godotenv.Load()


	if err != nil {
		log.Fatalf("Error loading .env file")
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




	http.HandleFunc("/api/hello" , handlerRequest)
	log.Println("server running at localhost :8080")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080" , nil))
}