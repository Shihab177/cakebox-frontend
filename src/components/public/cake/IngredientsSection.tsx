import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FONTS } from "@/constants/fonts";

interface IngredientsSectionProps {
  ingredients?: string[];
}

export const IngredientsSection = ({ ingredients }: IngredientsSectionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!ingredients || ingredients.length === 0) return null;

  const displayedIngredients = isExpanded ? ingredients : ingredients.slice(0, 4);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>INGREDIENTS</Text>
      {displayedIngredients.map((item, index) => (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.ingredientText}>{item}</Text>
        </View>
      ))}

      {ingredients.length > 4 && (
        <TouchableOpacity
          style={styles.readMoreBtn}
          activeOpacity={0.7}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.readMoreText}>
            {isExpanded ? "SHOW LESS" : "READ MORE"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bulletPoint: {
    fontSize: 14,
    color: "#828282",
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#828282",
    flex: 1,
  },
  readMoreBtn: {
    backgroundColor: "#FFF2E6",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 12,
  },
  readMoreText: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: "#FF7800",
    letterSpacing: 0.5,
  },
});