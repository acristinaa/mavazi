import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface SwipeButtonProps {
  onPress: () => void;
  icon: "thumbs-down" | "cards-heart-outline";
  size?: number;
}

export const SwipeButton = ({ onPress, icon, size = 50 }: SwipeButtonProps) => {
  const Icon =
    icon === "thumbs-down"
      ? MaterialCommunityIcons
      : MaterialCommunityIcons;

  const iconName = icon === "thumbs-down" ? "thumb-down" : "cards-heart-outline";

  return (
    <TouchableOpacity
      style={[styles.button, icon === "thumbs-down" ? styles.dontLikeButton : styles.likeButton, { width: size, height: size }]}
      onPress={onPress}
    >
      <Icon
        name={iconName}
        size={size * 0.55}
        color={icon === "thumbs-down" ? Colors.light.darkPink : Colors.light.dubaiChocolate}
      />
    </TouchableOpacity>
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
