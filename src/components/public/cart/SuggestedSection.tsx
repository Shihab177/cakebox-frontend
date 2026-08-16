import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { FONTS } from "@/constants/fonts";

import { TCake } from "./CartItemCard";
import { SuggestedCakeCard } from "./SuggestedCakeCard";
import { EmptyCart } from "./EmptyCart";

interface SuggestedSectionProps {
  items: TCake[];
  onItemPress: (id: string) => void;
}

export const SuggestedSection = ({
  items,
  onItemPress,
}: SuggestedSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.suggestedSection}>
      <Text style={styles.sectionTitle}>YOU MAY ALSO LIKE</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}
        renderItem={({ item }) => (
          <SuggestedCakeCard item={item} onPress={onItemPress} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  suggestedSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    letterSpacing: 0.8,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  horizontalListContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
});
