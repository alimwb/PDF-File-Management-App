import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListScreen from "./ListScreen";
import AddBookScreen from "./AddBookScreen";
import { useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const MainScreen: React.FC = () => {
  const [random, setRandom]:any = useState(Math.random())
    const route = useRoute()
    const authToken:any = route.params?.authToken;

    const handleRefresh=()=>{
      setRandom(Math.random())
    }
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Add" component={()=><AddBookScreen authToken={authToken} refresh={handleRefresh}/>} />
        <Tab.Screen name="List" component={()=><ListScreen random={random}/>} />
      </Tab.Navigator>
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
