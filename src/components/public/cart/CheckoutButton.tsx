import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FONTS } from "@/constants/fonts";

interface CheckoutButtonProps {
  onPress: () => void;
}

export const CheckoutButton = ({ onPress }: CheckoutButtonProps) => (
  <TouchableOpacity
    style={styles.checkoutBtn}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <Text style={styles.checkoutText}>Checkout</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkoutBtn: {
    backgroundColor: "#FF7A28",
    marginHorizontal: 20,
    marginBottom: 36,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF7A28",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#FFFFFF",
  },
});
