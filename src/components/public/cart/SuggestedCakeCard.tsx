import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { FONTS } from "@/constants/fonts";
import { truncateWords } from "@/utils/textUtils";
import { TCake } from "./CartItemCard";

interface SuggestedCakeCardProps {
  item: TCake;
  onPress: (id: string) => void;
}

export const SuggestedCakeCard = ({
  item,
  onPress,
}: SuggestedCakeCardProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.suggestedCard}
    onPress={() => onPress(item._id)}
  >
    <Image source={{ uri: item.images[0] }} style={styles.suggestedImage} />
    <Text style={styles.suggestedTitle} numberOfLines={1}>
      {item.title}
    </Text>
    <Text style={styles.suggestedDescription} numberOfLines={2}>
      {truncateWords(item.description, 8)}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  suggestedCard: {
    width: 130,
  },
  suggestedImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestedTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    marginBottom: 4,
  },
  suggestedDescription: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: "#828282",
    lineHeight: 15,
  },
});
