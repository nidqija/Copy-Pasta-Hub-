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
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 20;

import CreatePost from "../CreatePost";
import { router } from "expo-router";

/* ================= TYPES ================= */

interface ApiPost {
  id: number;
  message: string;
}

interface Post {
  id: string;
  title: string;
  subreddit: string;
  user: string;
  time: string;
  votes: string;
  comments: string;
  hasMedia: boolean;
  preview: string;
}

interface PostCardProps {
  post: Post;
}

/* ================= POST CARD ================= */

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.subredditText}>r/{post.subreddit}</Text>
        <Text style={styles.metaText}>
          u/{post.user} • {post.time}
        </Text>
      </View>

      <Text style={styles.titleText} numberOfLines={2}>
        {post.title}
      </Text>

      {post.hasMedia && <View style={styles.mediaPlaceholder} />}

      <Text style={styles.previewText} numberOfLines={3}>
        {post.preview}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <AntDesign size={16} color="#FF4500" />
          <Text style={styles.voteCount}>{post.votes}</Text>
          <AntDesign  size={16} color="#777" />
        </View>

        <View style={styles.footerItem}>
          <Ionicons name="chatbubble-outline" size={16} color="#777" />
          <Text style={styles.footerText}>{post.comments}</Text>
        </View>

        <View style={styles.footerItem}>
          <Feather name="share-2" size={16} color="#777" />
          <Text style={styles.footerText}>Share</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* ================= HEADER ================= */

const Header: React.FC = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.logoText}>CopyPastaHub</Text>

    <View style={styles.searchBar}>
      <Ionicons name="search" size={18} color="#777" style={{ marginRight: 5 }} />
      <TextInput
        placeholder="Search..."
        style={styles.searchInput}
        placeholderTextColor="#777"
      />
    </View>

    <TouchableOpacity style={styles.signUpButton} onPress={()=> router.push("../SignUp")}>
      <Text style={styles.signUpButtonText}>Join</Text>
    </TouchableOpacity>
  </View>
);

/* ================= HOME SCREEN ================= */

const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://unwrinkleable-austin-unreplaced.ngrok-free.dev/api/posts", {
      headers: {
        Authorization: "Bearer my-secret-token",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((data: ApiPost[]) => {
        const mappedPosts: Post[] = data.map(post => ({
          id: post.id.toString(),
          title: post.message,
          subreddit: "copypastahub",
          user: "anonymous",
          time: "just now",
          votes: "1",
          comments: "0",
          hasMedia: false,
          preview: post.message,
        }));

        setPosts(mappedPosts);
      })
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <PostCard post={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <View style={styles.controlBar}>
        <TouchableOpacity style={styles.createButton} onPress={() => router.push("../CreatePost")}>
          <Text style={styles.createButtonText}>+ Create Post</Text>
        </TouchableOpacity>

        <Text style={styles.sortLabel}>Sort By:</Text>
        <TouchableOpacity>
          <Text style={styles.sortOptionActive}>Hot</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.sortOption}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.sortOption}>Top</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
};

/* ================= STYLES ================= */

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

export default HomeScreen;
