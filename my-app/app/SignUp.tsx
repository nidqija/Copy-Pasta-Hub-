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
} from "react-native";

import { router } from "expo-router";


const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 20;



interface SignUpData {
    username: string;
    email: string;
    password:string;
}



const SignUp: React.FC = () => {

   
  const [username , setUsername] = useState <string>('');
  const [email , setEmail] = useState <string>('');
  const [password , setPasword] = useState <string>('');
 /*
  const handleSubmit = async () => {

    if (!username || !email || !password) {
        console.error('Username, email, and password are required for sign up.');
    }

    try {
        const response = await fetch ('http://localhost:8080/signup' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username:username,
                email:email,
                password:password
            })
        })
    } catch (error){
        console.error('Error during sign up: ' , error);
    }
    };
*/

  return (
    <>
    <View style={{backgroundColor:'white' , marginBottom:20}} >
      <Text style={{color: "black" , fontFamily:'Arial' , fontSize:18 , fontWeight:"bold" , padding: 20}}>Sign Up</Text>

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Username</Text>
        <TextInput value={username}  style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} multiline={true} placeholder="eg: johndoe" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Email</Text>
        <TextInput value={email} style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} multiline={true} placeholder="eg: johndoe@example.com" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Password</Text>
        <TextInput value={password} style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:40}} multiline={true} placeholder="eg: ilovecopypasta" />
         
        <TouchableOpacity onPress={(()=> router.push ("../Login"))} >
            <Text style={{color:'black' , marginBottom:100 , padding:20 }}>Already have an account? Login</Text>
        </TouchableOpacity>
        <Button title="Submit" /*onPress={handleSubmit}*/ />       
    </View>

    </>
  );
};


export default SignUp;

