import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FONTS } from "@/constants/fonts";

interface DeliveryTimeSelectorProps {
  deliveryType: "ASAP" | "Later";
  scheduledLabel: string;
  onSelectAsap: () => void;
  onSelectLater: () => void;
}

export const DeliveryTimeSelector = ({
  deliveryType,
  scheduledLabel,
  onSelectAsap,
  onSelectLater,
}: DeliveryTimeSelectorProps) => {
  return (
    <View style={styles.deliverySection}>
      <Text style={styles.sectionTitle}>TIME OF DELIVERY</Text>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.toggleBtn,
            deliveryType === "ASAP" && styles.activeToggleBtn,
          ]}
          onPress={onSelectAsap}
        >
          <Text
            style={[
              styles.toggleBtnText,
              deliveryType === "ASAP" && styles.activeToggleText,
            ]}
          >
            ASAP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.toggleBtn,
            deliveryType === "Later" && styles.activeToggleBtn,
          ]}
          onPress={onSelectLater}
        >
          <Text
            style={[
              styles.toggleBtnText,
              deliveryType === "Later" && styles.activeToggleText,
            ]}
          >
            {scheduledLabel ? scheduledLabel : "Later"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deliverySection: { marginTop: 12 },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: "#301F1F",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  toggleRow: { flexDirection: "row", gap: 10 },
  toggleBtn: {
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeToggleBtn: { backgroundColor: "#FFF0E6" },
  toggleBtnText: { fontSize: 14, fontFamily: FONTS.medium, color: "#1A1A1A" },
  activeToggleText: { color: "#FF7A28" },
});