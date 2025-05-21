import ClothingCard from "@/components/swipe-page/clothing-card";
import { SwipeButton } from "@/components/swipe-page/swipe-buttons";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
export default function SwipePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Time to swipe!</Text>

      <View style={styles.cardContainer}>
        <ClothingCard imageUrl="https://via.placeholder.com/150" name="Test" owner="Test" size="Test" />
      </View>

      <View style={styles.buttonContainer}>
        <SwipeButton onPress={() => {}} size={85}/>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.dubaiChocolate,
    marginTop: 50,
  },
  cardContainer: {
    width: "80%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    marginTop: -40,
    gap: 40,
  },
});