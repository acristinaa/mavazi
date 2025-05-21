import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
interface CategoryButtonProps {
  name: string;
  onPress: () => void;
}

export const CategoryButton = ({ name, onPress }: CategoryButtonProps) => (
  <TouchableOpacity style={styles.categoryButton} onPress={onPress}>
    <Text style={styles.buttonText}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 100,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: Colors.light.white,
  },
  buttonText: {
    fontSize: 16,
  },
});