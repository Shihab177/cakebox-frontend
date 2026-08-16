import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FONTS } from "@/constants/fonts";

interface CakeBottomBarProps {
  price: number;
  onAddToCart: () => void;
}

export const CakeBottomBar = ({ price, onAddToCart }: CakeBottomBarProps) => (
  <View style={styles.bottomBarContainer}>
    <View style={styles.priceContainer}>
      <Text style={styles.priceText}>£{price}</Text>
    </View>
    <TouchableOpacity
      onPress={onAddToCart}
      style={styles.addToCartBtn}
      activeOpacity={0.8}
    >
      <Text style={styles.addToCartText}>Add to cart</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomBarContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    gap: 12,
  },
  priceContainer: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#301F1F",
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: "#FF7A28",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#FFFFFF",
  },
});