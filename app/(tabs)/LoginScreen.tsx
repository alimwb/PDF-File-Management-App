import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("string1");
  const [password, setPassword] = useState<string>("string");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://185.147.162.246:8088/api/Login/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text:any = await response.text();

      try {       

        if (text) {
            navigation.navigate("Main", { authToken: text });
          Alert.alert("Success", `Welcome, ${username}!`);
        } else {
          Alert.alert("Error", text || "Login failed");
        }
      } catch (error) {
        console.error("JSON Parse error:", error);
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isLoading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default LoginScreen;
