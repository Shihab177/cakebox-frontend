import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "@/constants/fonts";

interface DetailRowProps {
  label: string;
  value: string;
  isBoldValue?: boolean;
}

export const DetailRow = ({
  label,
  value,
  isBoldValue = false,
}: DetailRowProps) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text
      style={[styles.detailValue, isBoldValue && styles.boldValue]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

interface ConfirmationDetailsProps {
  address?: string;
  name?: string;
  phone?: string;
  deliveryTime?: string;
  paymentInfo?: string;
  cakePrice?: string;
  deliveryFee?: string;
  totalPrice?: string;
}

export const ConfirmationDetails = ({
  address = "1234 NW Bobcat Lane",
  name = "Lucy",
  phone = "(555) 555-1234",
  deliveryTime = "November 4, 11:38",
  paymentInfo = "****3456",
  cakePrice = "£25",
  deliveryFee = "£2",
  totalPrice = "£27",
}: ConfirmationDetailsProps) => {
  return (
    <View>
      <View style={styles.detailsContainer}>
        <DetailRow label="ADDRESS" value={address} />
        <DetailRow label="NAME" value={name} />
        <DetailRow label="PHONE NUMBER" value={phone} />
        <DetailRow label="TIME OF DELIVERY" value={deliveryTime} />
        <DetailRow label="PAYMENT INFORMATION" value={paymentInfo} />

        <View style={styles.spacer} />

        <DetailRow label="CAKE NAME" value={cakePrice} isBoldValue />
        <DetailRow label="DELIVERY" value={deliveryFee} isBoldValue />
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.totalValue}>{totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: { gap: 15 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: "#301F1F",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: "#301F1F",
    textAlign: "right",
    flex: 1,
    marginLeft: 20,
  },
  boldValue: { fontFamily: FONTS.bold, fontSize: 14 },
  spacer: { height: 1 },
  divider: { height: 1, backgroundColor: "#E0E0E0", marginVertical: 24 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: "#1A1A1A",
    letterSpacing: 0.5,
  },
  totalValue: { fontSize: 16, fontFamily: FONTS.bold, color: "#1A1A1A" },
});