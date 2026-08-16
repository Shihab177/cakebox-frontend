import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "@/constants/fonts";
import CustomInput from "@/components/common/CustomInput";

interface CardFormProps {
  cardNumber: string;
  expiry: string;
  cvv: string;
  onCardNumberChange: (text: string) => void;
  onExpiryChange: (text: string) => void;
  onCvvChange: (text: string) => void;
}

export const CardForm = ({
  cardNumber,
  expiry,
  cvv,
  onCardNumberChange,
  onExpiryChange,
  onCvvChange,
}: CardFormProps) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>PAYMENT INFORMATION</Text>

      <CustomInput
        label="Card number"
        placeholder="Card number"
        value={cardNumber}
        onChangeText={onCardNumberChange}
      />

      <View style={styles.row}>
        <View style={styles.expiryCol}>
          <CustomInput
            label="Expiration date"
            placeholder="Expiration date"
            value={expiry}
            onChangeText={onExpiryChange}
          />
        </View>

        <View style={styles.cvvCol}>
          <CustomInput
            label="CVV"
            placeholder="CVV"
            value={cvv}
            onChangeText={onCvvChange}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiryCol: {
    flex: 1.5,
    marginRight: 12,
  },
  cvvCol: {
    flex: 1,
  },
});