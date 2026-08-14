import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/fonts";
import { truncateWords } from "@/utils/textUtils";

type TCake = {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  ingredients: string[];
  price: number;
  qty: number;
};

const MOCK_CART_ITEMS: TCake[] = [
  {
    _id: "6a76af87ebh4672cf76e25431",
    title: "Chocolate cake",
    description:
      "A good chocolate cake can be enjoyed on just about any occasion with rich chocolate sponge...",
    categoryId: "1",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400",
    ],
    ingredients: ["Flour", "Sugar", "Cocoa Powder"],
    price: 25,
    qty: 1,
  },
  
];

const MOCK_YOU_MAY_LIKE: TCake[] = [
  {
    _id: "6a76af87eb4672cf76e25432",
    title: "Rainbow cake",
    description: "This impressive rainbow cake is the perfect center piece...",
    categoryId: "1",
    images: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=80…",
    ],
    ingredients: ["Flour", "Sugar", "Food Color"],
    price: 35,
    qty: 8,
  },
  {
    _id: "6a76af87eb4672cf76e25436",
    title: "Birthday cake",
    description:
      "A good vanilla cake can be enjoyed on just about any occasion...",
    categoryId: "1",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=400",
    ],
    ingredients: ["Vanilla", "Cream", "Sugar"],
    price: 26,
    qty: 14,
  },
  {
    _id: "6a76af87eb4672cf76e25435",
    title: "Mr. Lion cake",
    description: "Cute little lion can make anyone happy on their birthday...",
    categoryId: "1",
    images: [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=400",
    ],
    ingredients: ["Butter", "Milk", "Flour"],
    price: 27,
    qty: 9,
  },
];

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<TCake[]>(MOCK_CART_ITEMS);

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckout = () => {
   router.push("/checkout" as any)
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Text style={styles.headerTitle}>Current order</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cartListSection}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <View key={item._id} style={styles.cartCard}>
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.cartItemImage}
                />
                <View style={styles.cartInfoContainer}>
                  <Text style={styles.cartItemTitle}>{item.title}</Text>
                  <Text style={styles.cartItemPrice}>£{item.price}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handleRemoveItem(item._id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={18} color="#301F1F" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Your cart is empty!</Text>
            </View>
          )}
        </View>

        <View style={styles.suggestedSection}>
          <Text style={styles.sectionTitle}>YOU MAY ALSO LIKE</Text>

          <FlatList
            data={MOCK_YOU_MAY_LIKE}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.suggestedCard}
                onPress={() => router.push(`/cake/${item._id}` as any)}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.suggestedImage}
                />
                <Text style={styles.suggestedTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.suggestedDescription} numberOfLines={2}>
                  {truncateWords(item.description, 8)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      {cartItems.length > 0 && (
        <TouchableOpacity

          style={styles.checkoutBtn}
          activeOpacity={0.8}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    textAlign: "center",
    paddingVertical: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  cartListSection: {
    paddingHorizontal: 20,
    gap: 12,
  },
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
  emptyCartContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#888",
  },
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
