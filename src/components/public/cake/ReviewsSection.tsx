import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "@/constants/fonts";
import { ReviewCard, TReview } from "./ReviewCard";

interface ReviewsSectionProps {
  reviews: TReview[];
  onSeeAllPress?: () => void;
}

export const ReviewsSection = ({ reviews, onSeeAllPress }: ReviewsSectionProps) => (
  <View style={styles.reviewsSection}>
    <View style={styles.reviewsHeader}>
      <Text style={styles.sectionTitle}>REVIEWS</Text>
      <Text style={styles.seeAllText} onPress={onSeeAllPress}>
        SEE ALL
      </Text>
    </View>
    <View style={styles.reviewsItemContainer}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  reviewsSection: {
    marginTop: 26,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#301F1F",
  },
  seeAllText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: "#FF7800",
  },
  reviewsItemContainer: {
    gap: 12,
  },
});