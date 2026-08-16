import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "@/constants/fonts";

interface ConfirmationProductCardProps {
  title?: string;
  price?: string;
}

export const ConfirmationProductCard = ({
  title = "Chocolate cake",
  price = "£25",
}: ConfirmationProductCardProps) => {
  return (
    <View style={styles.productCard}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Img</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 17,
    borderRadius: 14,
    marginTop: 30,
    marginBottom: 32,
  },
  imagePlaceholder: {
    width: 74,
    height: 54,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  placeholderText: {
    fontSize: 10,
  },
  productInfo: { flex: 1 },
  productTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: "#301F1F",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: "#301F1F",
  },
});