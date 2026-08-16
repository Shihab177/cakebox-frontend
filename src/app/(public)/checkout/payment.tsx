import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ScreenHeader from "@/components/common/ScreenHeader";
import { CardForm } from "@/components/checkout/CardForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentBottomBar } from "@/components/checkout/PaymentBottomBar";


const PaymentScreen = () => {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = useCallback((text: string) => {
    let formattedText = text
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    if (formattedText.length <= 19) setCardNumber(formattedText);
  }, []);

  const handleExpiryChange = useCallback((text: string) => {
    let formattedText = text.replace(/\D/g, "");
    if (formattedText.length >= 2) {
      formattedText =
        formattedText.substring(0, 2) + "/" + formattedText.substring(2, 4);
    }
    setExpiry(formattedText);
  }, []);

  const handleCvvChange = useCallback((text: string) => {
    setCvv(text.replace(/\D/g, "").substring(0, 4));
  }, []);

  const isFormValid = useMemo(() => {
    return cardNumber.length >= 19 && expiry.length === 5 && cvv.length >= 3;
  }, [cardNumber, expiry, cvv]);

  const handlePaymentSubmit = () => {
    if (!isFormValid) return;
    router.push("/checkout/confirmation");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScreenHeader title="Checkout" />

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <CardForm
            cardNumber={cardNumber}
            expiry={expiry}
            cvv={cvv}
            onCardNumberChange={handleCardNumberChange}
            onExpiryChange={handleExpiryChange}
            onCvvChange={handleCvvChange}
          />

          <OrderSummary
            itemLabel="CAKE NAME"
            itemPrice="£25"
            deliveryFee="£2"
            totalPrice="£27"
          />
        </ScrollView>

        <PaymentBottomBar
          isFormValid={isFormValid}
          onPress={handlePaymentSubmit}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  keyboardView: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 30 },
});