// HomeScreen.tsx - WhatsApp-style Chat List
import React, { useState, useEffect } from "react";
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
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

/* ================= TYPES ================= */

interface Chat {
  id: string;
  username: string;
  displayName: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
}

interface ChatItemProps {
  chat: Chat;
  onPress: () => void;
}

/* ================= CHAT ITEM ================= */

const ChatItem: React.FC<ChatItemProps> = ({ chat, onPress }) => {
  // Generate avatar color based on username
  const getAvatarColor = (name: string) => {
    const colors = ["#ff4500", "#25D366", "#0088cc", "#9c27b0", "#ff9800", "#e91e63"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress} activeOpacity={0.7}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(chat.username) }]}>
          <Text style={styles.avatarText}>
            {chat.displayName.charAt(0).toUpperCase()}
          </Text>
        </View>
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      {/* Chat Info */}
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.displayName} numberOfLines={1}>
            {chat.displayName}
          </Text>
          <Text style={[styles.timeText, chat.unreadCount > 0 && styles.timeTextUnread]}>
            {chat.time}
          </Text>
        </View>

        <View style={styles.chatPreview}>
          <Text style={styles.usernameText}>@{chat.username}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
        </View>

        {chat.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{chat.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

/* ================= HEADER ================= */

const Header: React.FC<{ onSearch: (text: string) => void }> = ({ onSearch }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.headerContainer}>
      {!isSearching ? (
        <>
          <Text style={styles.logoText}>Zen Chatter</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => setIsSearching(true)}
            >
              <Ionicons name="search" size={22} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <MaterialIcons name="more-vert" size={22} color="#555" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchText("");
              onSearch("");
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#555" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by username..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              onSearch(text);
            }}
            autoFocus
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
                onSearch("");
              }}
            >
              <Ionicons name="close" size={22} color="#555" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

/* ================= EMPTY STATE ================= */

const EmptyState: React.FC = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="chatbubbles-outline" size={80} color="#ddd" />
    <Text style={styles.emptyTitle}>No conversations yet</Text>
    <Text style={styles.emptySubtitle}>
      Start a new chat by tapping the button below
    </Text>
  </View>
);

/* ================= HOME SCREEN ================= */

const HomeScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sampleChats: Chat[] = [
      {
        id: "1",
        username: "john_doe",
        displayName: "John Doe",
        lastMessage: "Hey, check out this copypasta! 😂",
        time: "10:30 AM",
        unreadCount: 3,
        isOnline: true,
      },
      {
        id: "2",
        username: "jane_smith",
        displayName: "Jane Smith",
        lastMessage: "That's hilarious 🤣",
        time: "9:45 AM",
        unreadCount: 0,
        isOnline: true,
      },
      {
        id: "3",
        username: "meme_lord",
        displayName: "Meme Lord",
        lastMessage: "I have the best collection...",
        time: "Yesterday",
        unreadCount: 1,
        isOnline: false,
      },
      {
        id: "4",
        username: "pasta_master",
        displayName: "Pasta Master",
        lastMessage: "Thanks for sharing!",
        time: "Yesterday",
        unreadCount: 0,
        isOnline: false,
      },
      {
        id: "5",
        username: "copypasta_king",
        displayName: "Copypasta King",
        lastMessage: "New pasta just dropped 🔥",
        time: "Monday",
        unreadCount: 5,
        isOnline: true,
      },
    ];

    setChats(sampleChats);
    setFilteredChats(sampleChats);
    setIsLoading(false);
  }, []);

  const handleSearch = (text: string) => {
    if (text.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(
        (chat) =>
          chat.username.toLowerCase().includes(text.toLowerCase()) ||
          chat.displayName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  };

  const handleChatPress = (chat: Chat) => {
    // Navigate to chat screen (you can implement this later)
    console.log("Opening chat with:", chat.username);
  };

  const renderItem: ListRenderItem<Chat> = ({ item }) => (
    <ChatItem chat={item} onPress={() => handleChatPress(item)} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onSearch={handleSearch} />

      {filteredChats.length === 0 && !isLoading ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("../CreatePost")}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ff4500",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    padding: 8,
    marginLeft: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1b",
    paddingVertical: 8,
  },

  // List
  listContainer: {
    paddingVertical: 4,
  },

  // Chat Item
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#25D366",
    borderWidth: 2,
    borderColor: "#fff",
  },
  chatInfo: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    paddingBottom: 12,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  displayName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1b",
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },
  timeTextUnread: {
    color: "#ff4500",
    fontWeight: "600",
  },
  chatPreview: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    fontSize: 13,
    color: "#ff4500",
    fontWeight: "500",
    marginRight: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: "#777",
    flex: 1,
  },
  unreadBadge: {
    position: "absolute",
    right: 0,
    bottom: 14,
    backgroundColor: "#ff4500",
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1b",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },

  // FAB
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ff4500",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#ff4500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HomeScreen;
