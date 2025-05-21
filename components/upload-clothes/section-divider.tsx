import { StyleSheet, View } from "react-native";

export const SectionDivider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },
})