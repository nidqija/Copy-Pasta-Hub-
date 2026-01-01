// HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ListRenderItem,
  Dimensions,
  Button,
  Alert,
} from "react-native";

import { router } from "expo-router";


const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 20;



const SignUp: React.FC = () => {

   
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPasword] = useState("");


  const handleSubmit = async () =>{
      if ( !username || !email || !password){
        Alert.alert("Please fill all the fields");
        return;
      }


      try {
        const response = await fetch (
            "https://unwrinkleable-austin-unreplaced.ngrok-free.dev/api/insertuser",

            {
              method:"POST",
              headers : {"Content-Type" : "application/json"} ,
              body : JSON.stringify({
                username,
                email,
                password
        }),
            }
          
          );
                
          const raw = await response.text();
          console.log("RAW RESPONSE:", raw);

          if(!response.ok){
            Alert.alert("Error" , raw || "Something went wrong");
            return;
          } else {
            Alert.alert("Success" , "User registered successfully");
          }




      
      } catch ( error ){
        console.error(error);
        Alert.alert("Error" , "Failed to register user");
      }


  }

 



  return (
    <>
    <View style={{backgroundColor:'white' , marginBottom:20}} >
      <Text style={{color: "black" , fontFamily:'Arial' , fontSize:18 , fontWeight:"bold" , padding: 20}}>Sign Up</Text>

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Username</Text>
        <TextInput value={username} onChangeText={setUsername} style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}}  placeholder="eg: johndoe" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} placeholder="eg: johndoe@example.com" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Password</Text>
        <TextInput value={password} onChangeText={setPasword} style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:40}}  placeholder="eg: ilovecopypasta" />
         
        <TouchableOpacity onPress={(()=> router.push ("../Login"))} >
            <Text style={{color:'black' , marginBottom:100 , padding:20 }}>Already have an account? Login</Text>
        </TouchableOpacity>
        <Button title="Submit" onPress={handleSubmit} />       
    </View>

    </>
  );
};


export default SignUp;

