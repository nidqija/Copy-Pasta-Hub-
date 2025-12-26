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

const SignUp: React.FC = () => {
  return (
    <>
    <View style={{backgroundColor:'white' , marginBottom:20}} >
      <Text style={{color: "black" , fontFamily:'Arial' , fontSize:18 , fontWeight:"bold" , padding: 20}}>Sign Up</Text>

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Username</Text>
        <TextInput id="username" style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} multiline={true} placeholder="eg: johndoe" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Email</Text>
        <TextInput id="email" style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} multiline={true} placeholder="eg: johndoe@example.com" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Password</Text>
        <TextInput id="password" style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:40}} multiline={true} placeholder="eg: ilovecopypasta" />
         
        <TouchableOpacity onPress={(()=> router.push ("../Login"))} >
            <Text style={{color:'black' , marginBottom:100 , padding:20 }}>Already have an account? Login</Text>
        </TouchableOpacity>
        <Button title="Submit" onPress={() => {}} />       
    </View>

    </>
  );
};


export default SignUp;

