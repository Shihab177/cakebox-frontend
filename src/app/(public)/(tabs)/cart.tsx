import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FONTS } from "@/constants/fonts";
import { CartItemCard, TCake } from "@/components/public/cart/CartItemCard";
import { EmptyCart } from "@/components/public/cart/EmptyCart";
import { SuggestedSection } from "@/components/public/cart/SuggestedSection";
import { CheckoutButton } from "@/components/public/cart/CheckoutButton";

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
  {
    _id: "6a76af87ebh4672cf76e25431gg",

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
  {
    _id: "6a76af87ebh4672cf76e25431gg",

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

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<TCake[]>(MOCK_CART_ITEMS);

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckout = () => {
    router.push("/checkout" as any);
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
              <CartItemCard
                key={item._id}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))
          ) : (
            <EmptyCart />
          )}
        </View>

        <SuggestedSection
          items={MOCK_YOU_MAY_LIKE}
          onItemPress={(id) => router.push(`/cake/${id}` as any)}
        />
      </ScrollView>

      {cartItems.length > 0 && <CheckoutButton onPress={handleCheckout} />}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F8F8" },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    textAlign: "center",
    paddingVertical: 16,
  },
  scrollContent: { paddingBottom: 40 },
  cartListSection: { paddingHorizontal: 20, gap: 12 },
});
