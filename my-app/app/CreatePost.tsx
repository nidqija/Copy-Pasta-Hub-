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


import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 20;



const CreatePost: React.FC = () => {
  return (
    <>
    <View style={{backgroundColor:'white' , marginBottom:20}} >
      <Text style={{color: "black" , fontFamily:'Arial' , fontSize:18 , fontWeight:"bold" , padding: 20}}>Create Post</Text>

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Copypasta Title</Text>
        <TextInput style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} multiline={true} placeholder="What's on your mind?" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Copypasta Description</Text>
        <TextInput style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:20}} multiline={true} placeholder="What's on your mind?" />

        <Text style={{color: "black" , fontFamily:'Arial' , fontSize:15 , padding: 20}} >Copypasta Category</Text>
        <TextInput style={{height:50, width:'90%', alignSelf:'center', borderColor:'gray', borderWidth:1, padding:10, fontSize:16 , marginBottom:200}} multiline={true} placeholder="What's on your mind?" />

        <Button title="Submit" onPress={() => {}} />       
    </View>

    </>
  );
};


export default CreatePost;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#edeff1",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff4500",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#ff4500",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "600",
  },

  controlBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  createButton: {
    backgroundColor: "#ff4500",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  createButtonText: {
    color: "white",
    fontWeight: "600",
  },
  sortLabel: {
    marginRight: 8,
  },
  sortOption: {
    color: "#777",
    marginRight: 15,
  },
  sortOptionActive: {
    color: "#ff4500",
    fontWeight: "700",
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#ff4500",
  },

  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  cardContainer: {
    width: CARD_WIDTH,
    alignSelf: "center",
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  subredditText: {
    fontWeight: "700",
    color: "#0079d3",
  },
  metaText: {
    fontSize: 12,
    color: "#777",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: "#333",
  },
  mediaPlaceholder: {
    height: 180,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  voteCount: {
    marginHorizontal: 4,
    fontWeight: "600",
    color: "#FF4500",
  },
  footerText: {
    marginLeft: 4,
    color: "#777",
  },
});
