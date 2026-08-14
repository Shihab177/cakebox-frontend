import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/fonts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_CONTAINER_WIDTH = SCREEN_WIDTH - 40;

type TReview = {
  id: string;
  name: string;
  rating: string;
  comment: string;
  avatar: string;
};

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
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isIngredientsExpanded, setIsIngredientsExpanded] =
    useState<boolean>(false);

  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const controller = new AbortController();
    const getSingleCake = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.100:3160/api/v1/cakes/${id}`,
          { signal: controller.signal },
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / IMAGE_CONTAINER_WIDTH);
    setActiveImageIndex(currentIndex);
  };

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

  const displayedIngredients = isIngredientsExpanded
    ? cake.ingredients
    : cake.ingredients?.slice(0, 4);

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
        <View style={styles.imageSectionContainer}>
          <FlatList
            data={
              cake.images && cake.images.length > 0
                ? cake.images
                : ["https://via.placeholder.com/400"]
            }
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.cakeImage}
                resizeMode="cover"
              />
            )}
          />

          {cake.images && cake.images.length > 1 && (
            <View style={styles.paginationContainer}>
              {cake.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeImageIndex === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <Text style={styles.descriptionText}>{cake.description}</Text>

        {cake.ingredients && cake.ingredients.length > 0 && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>INGREDIENTS</Text>
            {displayedIngredients.map((item, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}

            {cake.ingredients.length > 4 && (
              <TouchableOpacity
                style={styles.readMoreBtn}
                activeOpacity={0.7}
                onPress={() => setIsIngredientsExpanded(!isIngredientsExpanded)}
              >
                <Text style={styles.readMoreText}>
                  {isIngredientsExpanded ? "SHOW LESS" : "READ MORE"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.reviewsSection}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.medium,
                fontSize: 12,
                color: "#301F1F",
              }}
            >
              REVIEWS
            </Text>
            <Text
              style={{ fontFamily: FONTS.bold, fontSize: 12, color: "#FF7800" }}
            >
              SEE ALL
            </Text>
          </View>
          <View style={styles.reviewsItemContainer}>
            {MOCK_REVIEWS.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{ uri: review.avatar }}
                    style={styles.avatar}
                  />
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <Text style={styles.ratingText}>{review.rating}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBarContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>£{cake.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/cart");
          }}
          style={styles.addToCartBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
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
  imageSectionContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    height: 260,
  },
  cakeImage: {
    width: IMAGE_CONTAINER_WIDTH,
    height: 260,
    borderRadius: 8,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 10,
    backgroundColor: "#FF7A28",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "#FFFFFF",
    opacity: 0.8,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#301F1F",
    lineHeight: 22,
    marginTop: 20,
  },
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
  reviewsSection: {
    marginTop: 26,
  },
  reviewsItemContainer: {
    gap: 12,
  },
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
