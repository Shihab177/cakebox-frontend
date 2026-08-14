import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { FONTS } from "@/constants/fonts";
import ScreenHeader from "@/components/common/ScreenHeader";
import CustomInput from "@/components/common/CustomInput";

const PaymentScreen = () => {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (text: string) => {
    let formattedText = text
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    if (formattedText.length <= 19) setCardNumber(formattedText);
  };

  const handleExpiryChange = (text: string) => {
    let formattedText = text.replace(/\D/g, "");
    if (formattedText.length >= 2) {
      formattedText =
        formattedText.substring(0, 2) + "/" + formattedText.substring(2, 4);
    }
    setExpiry(formattedText);
  };

  const handleCvvChange = (text: string) => {
    setCvv(text.replace(/\D/g, "").substring(0, 4));
  };

  const isFormValid = useMemo(() => {
    return cardNumber.length >= 19 && expiry.length === 5 && cvv.length >= 3;
  }, [cardNumber, expiry, cvv]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Checkout" />

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>PAYMENT INFORMATION</Text>

          <CustomInput
            label="Card number"
            placeholder="Card number"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />

          <View style={styles.row}>
            <View style={{ flex: 1.5, marginRight: 12 }}>
              <CustomInput
                label="Expiration date"
                placeholder="Expiration date"
                value={expiry}
                onChangeText={handleExpiryChange}
              />
            </View>

            <View style={{ flex: 1 }}>
              <CustomInput
                label="CVV"
                placeholder="CVV"
                value={cvv}
                onChangeText={handleCvvChange}
              />
            </View>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>CAKE NAME</Text>
              <Text style={styles.summaryValue}>£25</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>DELIVERY</Text>
              <Text style={styles.summaryValue}>£2</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>TOTAL</Text>
              <Text style={styles.summaryValueTotal}>£27</Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isFormValid}
          style={[
            styles.continueBtn,
            isFormValid ? styles.activeContinueBtn : styles.disabledContinueBtn,
          ]}
          onPress={() => router.push("/checkout/confirmation")}
        >
          <Text
            style={[
              styles.continueText,
              isFormValid
                ? styles.activeContinueText
                : styles.disabledContinueText,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 17, fontFamily: FONTS.bold, color: "#1A1A1A" },
  container: { paddingHorizontal: 20, paddingTop: 30, },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: "uppercase",
  },

  input: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: "#1A1A1A",
    padding: 0,
  },
  row: { flexDirection: "row", alignItems: "center" },
  summaryContainer: { marginTop: 24 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: "#301F1F",
    letterSpacing: 0.5,
  },
  summaryValue: { fontSize: 14, fontFamily: FONTS.bold, color: "#301F1F" },
  summaryValueTotal: { fontSize: 16, fontFamily: FONTS.bold, color: "#301F1F" },
  divider: { height: 1, backgroundColor: "#E0E0E0", marginVertical: 12 },

  continueBtn: {
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledContinueBtn: { backgroundColor: "#F5F5F5" },
  activeContinueBtn: { backgroundColor: "#FF7A28" },
  continueText: { fontSize: 16, fontFamily: FONTS.medium },
  disabledContinueText: { color: "#C4C4C4" },
  activeContinueText: { color: "#FFFFFF" },
});
