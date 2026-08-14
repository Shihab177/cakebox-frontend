import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FONTS } from "@/constants/fonts";

const SuccessScreen = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.dismissAll();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Your order is on its way!</Text>

        <View style={styles.imageContainer}>
          <View style={styles.circleBg}>
            <Text style={styles.placeholderText}>🍰</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.homeBtn}
        activeOpacity={0.8}
        onPress={handleBackToHome}
      >
        <Text style={styles.homeBtnText}>Back to home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: "#1A1A1A",
    marginBottom: 40,
    textAlign: "center",
  },

  imageContainer: { alignItems: "center", justifyContent: "center" },
  circleBg: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#FFF0E6",
    alignItems: "center",
    justifyContent: "center",
  },
  cakeImage: { width: 120, height: 120, resizeMode: "contain" },
  placeholderText: { fontSize: 80 }, // Remove this if using actual image

  homeBtn: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#FF7A28",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  homeBtnText: { fontSize: 16, fontFamily: FONTS.medium, color: "#FFFFFF" },
});
