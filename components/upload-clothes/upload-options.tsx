import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UploadOptionsProps {
  onCameraPress: () => void;
  onLibraryPress: () => void;
  onFilesPress: () => void;
}

export const UploadOptions = ({ onCameraPress, onLibraryPress, onFilesPress }: UploadOptionsProps) => (
  <View style={styles.uploadButtonsContainer}>
    <TouchableOpacity style={styles.uploadButton} onPress={onCameraPress}>
      <Text style={styles.buttonText}>Camera</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.uploadButton} onPress={onLibraryPress}>
      <Text style={styles.buttonText}>Library</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.uploadButton} onPress={onFilesPress}>
      <Text style={styles.buttonText}>Files</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  uploadButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});