import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ScreenHeader from "@/components/common/ScreenHeader";
import { ConfirmationProductCard } from "@/components/checkout/ConfirmationProductCard";
import { ConfirmationDetails } from "@/components/checkout/ConfirmationDetails";
import { ConfirmationBottomBar } from "@/components/checkout/ConfirmationBottomBar";

const ConfirmationScreen = () => {
  const router = useRouter();

  const handleAllGood = () => {
    router.replace("/checkout/success");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScreenHeader title="Confirm your order" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ConfirmationProductCard title="Chocolate cake" price="£25" />
        <ConfirmationDetails />
      </ScrollView>

      <ConfirmationBottomBar onPress={handleAllGood} />
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { paddingHorizontal: 20 },
});