import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FONTS } from "@/constants/fonts";

interface ConfirmationBottomBarProps {
  onPress: () => void;
  title?: string;
}

export const ConfirmationBottomBar = ({
  onPress,
  title = "All good",
}: ConfirmationBottomBarProps) => {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.submitText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#FF7A28",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#FFFFFF",
  },
});