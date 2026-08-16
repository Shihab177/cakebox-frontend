import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "@/constants/fonts";

export const EmptyCart = () => (
  <View style={styles.emptyCartContainer}>
    <Text style={styles.emptyCartText}>Your cart is empty!</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyCartContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#888",
  },
});
