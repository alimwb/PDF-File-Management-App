import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Platform,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FileState from "./FileState";
import { useNavigation } from "@react-navigation/native";

type Book = {
  id: number;
  fileAddress: string;
  name: string;
};

const MainScreen: React.FC = ({random}:any) => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigation = useNavigation();
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://185.147.162.246:8088/api/Books");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      Alert.alert("Error", "Failed to fetch books. Please try again.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [random]);

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookName}>{item.name}</Text>
      <View style={styles.iconContainer}>
        <FileState uri={item.fileAddress} fileName={item.name} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No books available</Text>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContainer: {
    paddingVertical: 16,
  },
  bookItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bookName: {
    fontSize: 16,
    color: "#fff",
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 10,
  },
  emptyList: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MainScreen;
