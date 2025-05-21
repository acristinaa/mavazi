import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type ClothingCardProps = {
  imageUrl: string;
  name: string;
  owner: string;
  size: string;
};

const ClothingCard = ({ imageUrl, name, owner, size }: ClothingCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.details}>
          <Text style={styles.owner}>{owner}</Text>
          <Text style={styles.size}>{size}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: Colors.light.yellowFaryd,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    width: "100%",
    maxWidth: 350,
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  details: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  owner: {
    fontSize: 14,
    color: "#666",
  },
  size: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ClothingCard;
