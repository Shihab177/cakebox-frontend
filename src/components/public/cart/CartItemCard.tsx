import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/fonts";

export type TCake = {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  ingredients: string[];
  price: number;
  qty: number;
};

interface CartItemCardProps {
  item: TCake;
  onRemove: (id: string) => void;
}

export const CartItemCard = ({ item, onRemove }: CartItemCardProps) => (
  <View style={styles.cartCard}>
    <Image source={{ uri: item.images[0] }} style={styles.cartItemImage} />
    <View style={styles.cartInfoContainer}>
      <Text style={styles.cartItemTitle}>{item.title}</Text>
      <Text style={styles.cartItemPrice}>£{item.price}</Text>
    </View>
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onRemove(item._id)}
      style={styles.deleteButton}
    >
      <Ionicons name="trash-outline" size={18} color="#301F1F" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  cartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cartItemImage: {
    width: 72,
    height: 54,
    borderRadius: 4,
  },
  cartInfoContainer: {
    flex: 1,
    marginLeft: 14,
    gap: 4,
  },
  cartItemTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#301F1F",
  },
  cartItemPrice: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: "#301F1F",
  },
  deleteButton: {
    padding: 8,
  },
});
