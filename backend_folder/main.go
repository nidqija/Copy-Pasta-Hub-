package main

import (
	"encoding/json"
	"log"
	"net/http"
)


type Response struct {
	Message string `json:"message"`
}


func handlerRequest(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type" , "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Hello, Skibidi!"})
}


func main(){
	http.HandleFunc("/api/hello" , handlerRequest)
	log.Println("server running at localhost :8080")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080" , nil))
}