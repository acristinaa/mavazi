import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface SwipeButtonProps {
  onPress: () => void;
  size?: number;
}

export const SwipeButton = ({ onPress, size = 50 }: SwipeButtonProps) => {
  return (
    <>
    <TouchableOpacity style={[styles.button, styles.dontLikeButton, { width: size, height: size }]} onPress={onPress}>
      <Feather name="thumbs-down" size={48} color={Colors.light.darkPink} />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, styles.likeButton, { width: size, height: size }]} onPress={onPress}>
      <MaterialCommunityIcons name="cards-heart-outline" size={50} color={Colors.light.dubaiChocolate} />
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.light.dubaiChocolate,
    backgroundColor: Colors.light.white,
    justifyContent: "center",
    alignItems: "center",
  },
  dontLikeButton: {
    borderColor: Colors.light.darkPink,
  },
  likeButton: {
    borderColor: Colors.light.dubaiChocolate,
  },
});
