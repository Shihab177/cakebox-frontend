import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/fonts";
import ScreenHeader from "@/components/common/ScreenHeader";

const DetailRow = ({
  label,
  value,
  isBoldValue = false,
}: {
  label: string;
  value: string;
  isBoldValue?: boolean;
}) => (
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
        <View style={styles.productCard}>
          <View style={styles.imagePlaceholder}>
            <Text style={{ fontSize: 10 }}>Img</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>Chocolate cake</Text>
            <Text style={styles.productPrice}>£25</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <DetailRow label="ADDRESS" value="1234 NW Bobcat Lane" />
          <DetailRow label="NAME" value="Lucy" />
          <DetailRow label="PHONE NUMBER" value="(555) 555-1234" />
          <DetailRow label="TIME OF DELIVERY" value="November 4, 11:38" />
          <DetailRow label="PAYMENT INFORMATION" value="****3456" />

          <View style={{ height: 1 }} />

          <DetailRow label="CAKE NAME" value="£25" isBoldValue />
          <DetailRow label="DELIVERY" value="£2" isBoldValue />
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>£27</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.submitBtn}
        activeOpacity={0.8}
        onPress={handleAllGood}
      >
        <Text style={styles.submitText}>All good</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

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
  container: { paddingHorizontal: 20 },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 17,
    borderRadius: 14,
    marginTop: 30,
    marginBottom: 32,
  },
  imagePlaceholder: {
    width: 74,
    height: 54,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  productInfo: { flex: 1 },
  productTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: "#301F1F",
    marginBottom: 4,
  },
  productPrice: { fontSize: 16, fontFamily: FONTS.bold, color: "#301F1F" },

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

  submitBtn: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#FF7A28",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: { fontSize: 16, fontFamily: FONTS.medium, color: "#FFFFFF" },
});
