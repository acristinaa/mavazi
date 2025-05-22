import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface SwipeButtonProps {
  onPress: () => void;
  icon: "thumbs-down" | "cards-heart-outline";
  size?: number;
}

export const SwipeButton = ({ onPress, icon, size = 50 }: SwipeButtonProps) => {
  const iconName = icon === "thumbs-down" ? "thumb-down" : "cards-heart-outline";
  const iconColor = icon === "thumbs-down" ? Colors.light.darkPink : Colors.light.dubaiChocolate;
  const borderColor = icon === "thumbs-down" ? Colors.light.darkPink : Colors.light.dubaiChocolate;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <View
        style={[
          styles.button,
          { borderColor, width: size, height: size }
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={size * 0.55}
          color={iconColor}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: Colors.light.white,
    justifyContent: "center",
    alignItems: "center",
  }
});
