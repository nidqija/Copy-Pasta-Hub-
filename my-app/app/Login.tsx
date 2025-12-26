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


const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 20;

const Login: React.FC = () => {
  return (
    <>
    <View style={{backgroundColor:'white' , marginBottom:20}} >
      <Text style={{color: "black" , fontFamily:'Arial' , fontSize:18 , fontWeight:"bold" , padding: 20}}>Login</Text>
        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Username</Text>
        <TextInput id="username" style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} multiline={true} placeholder="eg: johndoe" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Password</Text>
        <TextInput id="password" style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:330}} multiline={true} placeholder="eg: ilovecopypasta" />

        <Button title="Submit" onPress={() => {}} />       
    </View>

    </>
  );
};


export default Login;
