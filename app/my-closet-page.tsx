import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MyClosetPage() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.closetContainer}>
        <MaterialCommunityIcons name="wardrobe-outline" size={80} color="#517238" />
      </View>

      <View>
        <Text style={styles.title}>My Closet</Text>
      </View>
      
      <View style={styles.grid}>
        <View style={styles.gridItem} />
        <View style={styles.gridItem} />
        <View style={styles.gridItem} />
        <View style={styles.gridItem} />
        <View style={styles.gridItem} />
        <View style={styles.gridItem} />
        <View style={styles.gridItem} />
        <View style={styles.gridItem} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.light.white,
    alignItems: "center",
  },
  closetContainer: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.yellowFaryd,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  gridItem: {
    width: 150,
    height: 150,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
});
