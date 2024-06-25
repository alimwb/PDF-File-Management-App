import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

interface AddBookScreenProps {
  authToken: string;
  refresh:any
}

const AddBookScreen: React.FC<AddBookScreenProps> = ({ authToken,refresh }) => {
  const [bookName, setBookName] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<any>(null);

  const handleFilePicker = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.assets) {
        setPdfFile(result);
      } else {
        Alert.alert("Error", "Failed to pick PdDF file");
      }
    } catch (error) {
      console.error("Document picker error:", error);
      Alert.alert("Error", "Document picker error");
    }
  };

  const handleSubmit = async () => {
    if (!bookName || !pdfFile) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const formData: any = new FormData();
    formData.append("Name", bookName);

    // Ensure pdfFile has the necessary structure before accessing its properties

    if (pdfFile.assets[0] && pdfFile.assets[0].uri) {
      const uri = pdfFile.assets[0].uri;
      const name = pdfFile.assets[0].name || "file.pdf"; // Use actual file name if available
      const type = pdfFile.assets[0].mimeType || "application/pdf"; // Use actual file type if available

      formData.append("file", {
        uri,
        name,
        type,
      });
    } else {
      Alert.alert("Error", "Invalid PDF file");
      return;
    }

    try {
      const response = await axios.post(
        "http://185.147.162.246:8088/api/Books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      Alert.alert("Success", "Book added successfully");
      refresh()
      // Clear input fields after successful submission
      setBookName("");
      setPdfFile(null);
    } catch (error: any) {
      console.error("Add book error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to add book");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Book Name</Text>
      <TextInput
        style={styles.input}
        value={bookName}
        onChangeText={setBookName}
      />
      <Button title="Pick PDF File" onPress={handleFilePicker} />
      {pdfFile && <Text style={styles.fileName}>{pdfFile.name}</Text>}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default AddBookScreen;
