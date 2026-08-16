import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FONTS } from "@/constants/fonts";

interface CheckoutBottomBarProps {
  isFormValid: boolean;
  onPress: () => void;
}

export const CheckoutBottomBar = ({
  isFormValid,
  onPress,
}: CheckoutBottomBarProps) => {
  return (
    <View style={styles.bottomBar}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    paddingHorizontal: 20,
    marginBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 12,
  },
  continueBtn: {
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledContinueBtn: { backgroundColor: "#F8F8F8" },
  activeContinueBtn: { backgroundColor: "#FF7A28" },
  continueText: { fontSize: 16, fontFamily: FONTS.medium },
  disabledContinueText: { color: "#828282" },
  activeContinueText: { color: "#FFFFFF" },
});