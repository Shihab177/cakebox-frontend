import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/fonts";

import { CakeImageCarousel } from "@/components/public/cake/CakeImageCarousel";
import { IngredientsSection } from "@/components/public/cake/IngredientsSection";
import { ReviewsSection } from "@/components/public/cake/ReviewsSection";
import { CakeBottomBar } from "@/components/public/cake/CakeBottomBar";
import { TReview } from "@/components/public/cake/ReviewCard";

type TPopularCakes = {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  ingredients: string[];
  reviewId?: string | null;
  price: number;
  qty: number;
};

const MOCK_REVIEWS: TReview[] = [
  {
    id: "1",
    name: "Laura",
    rating: "3/5",
    comment:
      "My new favorite chocolate cake. It's SOOOOOO moist, and yes, all caps was essential. I could eat it by itself...",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Ildi",
    rating: "5/5",
    comment:
      "We love chocolate - lots of chocolate! So it's the perfect cake for us!",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: "3",
    name: "Tracey",
    rating: "5/5",
    comment:
      "This is, without a doubt, the best chocolate cake I've ever had. And I'm confident you'd say the same thing!",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
];

export default function CakeDetailsScreen() {
  const [cake, setCake] = useState<TPopularCakes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const controller = new AbortController();
    const getSingleCake = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.100:3160/api/v1/cakes/${id}`,
          { signal: controller.signal }
        );
        setCake(response.data?.data || null);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("API Error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    getSingleCake();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#301F1F" />
      </View>
    );
  }

  if (!cake) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.notFoundText}>Popular cake not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.6}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#301F1F" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {cake.title}
        </Text>

        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CakeImageCarousel images={cake.images} />

        <Text style={styles.descriptionText}>{cake.description}</Text>

        <IngredientsSection ingredients={cake.ingredients} />

        <ReviewsSection reviews={MOCK_REVIEWS} />
      </ScrollView>

      <CakeBottomBar price={cake.price} onAddToCart={() => router.push("/cart")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#301F1F",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 32,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    textAlign: "center",
    flex: 1,
  },
  rightPlaceholder: {
    width: 32,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#301F1F",
    lineHeight: 22,
    marginTop: 20,
  },
});