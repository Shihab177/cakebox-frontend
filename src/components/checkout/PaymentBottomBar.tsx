import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FONTS } from "@/constants/fonts";

interface PaymentBottomBarProps {
  isFormValid: boolean;
  onPress: () => void;
}

export const PaymentBottomBar = ({
  isFormValid,
  onPress,
}: PaymentBottomBarProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!isFormValid}
      style={[
        styles.continueBtn,
        isFormValid ? styles.activeContinueBtn : styles.disabledContinueBtn,
      ]}
      onPress={onPress}
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
  );
};

const styles = StyleSheet.create({
  continueBtn: {
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledContinueBtn: {
    backgroundColor: "#F5F5F5",
  },
  activeContinueBtn: {
    backgroundColor: "#FF7A28",
  },
  continueText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  disabledContinueText: {
    color: "#C4C4C4",
  },
  activeContinueText: {
    color: "#FFFFFF",
  },
});