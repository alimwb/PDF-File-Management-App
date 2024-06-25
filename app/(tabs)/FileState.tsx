
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Platform, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { IconButton } from "react-native-paper";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

type DownloadStatus = "NOTSTARTED" | "DOWNLOADING" | "FINISHED" | "ERROR";

const FileState: React.FC = (props:any) => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>("NOTSTARTED");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const uri = props.uri;
  const fileName = props.fileName;
  const fileUri = FileSystem.documentDirectory + fileName;

  const callback = (downloadProgress: { totalBytesWritten: number; totalBytesExpectedToWrite: number; }) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress * 100); // Multiply by 100 to convert to percentage
  };

  const checkAvail = async () => {
    try {
      const info = await FileSystem.getInfoAsync(fileUri);
      if (info.exists) {
        setDownloadStatus("FINISHED");
      }
    } catch (error) {
      console.error("Error checking file availability:", error);
    }
  };

  useEffect(() => {
    checkAvail();
  }, [uri]);

  const handleDownload = async () => {
    setDownloadStatus("DOWNLOADING");
    const downloadResumable = FileSystem.createDownloadResumable(
      uri,
      fileUri,
      {},
      callback
    );

    try {
      const { uri }:any = await downloadResumable.downloadAsync();
      setDownloadStatus("FINISHED");
      console.log("Finished downloading to ", uri);
    } catch (error) {
      setDownloadStatus("ERROR");
      console.error("Download error:", error);
    }
  };

  const handleOpenFile = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        Alert.alert("File does not exist", "The requested file does not exist on the device.");
        return;
      }

      if (Platform.OS === 'android') {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Open PDF file',
          });
        } else {
          const contentUri = await FileSystem.getContentUriAsync(fileUri);
          const ctype = "application/pdf";
          const intentParams = {
            action: IntentLauncher.ACTION_VIEW,
            data: contentUri,
            type: ctype,
            flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
          };
          await IntentLauncher.startActivityAsync("android.intent.action.VIEW", intentParams);
        }
      } else if (Platform.OS === 'ios') {
        const result:any = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: false });
        if (result.type === 'success') {
          await Linking.openURL(result.uri);
        } else {
          Alert.alert("Error", "Unable to open the file.");
        }
      }
    } catch (error) {
      console.error("Error opening file:", error);
      Alert.alert("Error", "Unable to open the file.");
    }
  };

  return (
    <View style={styles.container}>
      {downloadStatus === "NOTSTARTED" && (
        <IconButton
          icon="download"
          size={24}
          style={styles.iconButton}
          onPress={handleDownload}
        />
      )}
      {downloadStatus === "DOWNLOADING" && (
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={40}
            width={3}
            fill={downloadProgress}
            tintColor="white"
            backgroundColor="#1890FF"
          >
            {() => (
              <IconButton
                icon="pause"
                size={20}
                style={styles.iconButton}
                onPress={() => {}}
              />
            )}
          </AnimatedCircularProgress>
        </View>
      )}
      {downloadStatus === "FINISHED" && (
        <IconButton
          icon="file"
          size={24}
          style={styles.iconButton}
          onPress={handleOpenFile}
        />
      )}
      {downloadStatus === "ERROR" && (
        <IconButton
          icon="alert"
          size={24}
          style={styles.iconButton}
          onPress={handleDownload}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    backgroundColor: "#1890FF",
    marginHorizontal: 10,
  },
  progressContainer: {
    marginHorizontal: 10,
  },
});

export default FileState;
