import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "@/constants/fonts";

interface OrderSummaryProps {
  itemLabel?: string;
  itemPrice?: string;
  deliveryFee?: string;
  totalPrice?: string;
}

export const OrderSummary = ({
  itemLabel = "CAKE NAME",
  itemPrice = "£25",
  deliveryFee = "£2",
  totalPrice = "£27",
}: OrderSummaryProps) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{itemLabel}</Text>
        <Text style={styles.summaryValue}>{itemPrice}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>DELIVERY</Text>
        <Text style={styles.summaryValue}>{deliveryFee}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>TOTAL</Text>
        <Text style={styles.summaryValueTotal}>{totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    marginTop: 24,
  },
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
  summaryValue: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: "#301F1F",
  },
  summaryValueTotal: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: "#301F1F",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
});