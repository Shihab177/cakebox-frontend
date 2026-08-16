import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FONTS } from "@/constants/fonts";

export type TReview = {
  id: string;
  name: string;
  rating: string;
  comment: string;
  avatar: string;
};

interface ReviewCardProps {
  review: TReview;
}

export const ReviewCard = ({ review }: ReviewCardProps) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image source={{ uri: review.avatar }} style={styles.avatar} />
      <Text style={styles.reviewerName}>{review.name}</Text>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <Text style={styles.reviewComment}>{review.comment}</Text>
  </View>
);

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    flex: 1,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#301F1F",
  },
  reviewComment: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: "#777",
    lineHeight: 18,
  },
});