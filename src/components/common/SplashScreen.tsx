import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export function CustomSplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.brandTitle}>cakebox</Text>
        <Text style={styles.tagline}>Delicious Bakery Delivery</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by</Text>
        <Text style={styles.developerName}>Shihab Islam</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandTitle: {
    fontFamily: "SFProText-Bold",
    fontSize: 42,
    color: "#000000",
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: "SFProText-Regular",
    fontSize: 14,
    color: "#718096",
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontFamily: "SFProText-Regular",
    fontSize: 12,
    color: "#A0AEC0",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  developerName: {
    fontFamily: "SFProText-Medium",
    fontSize: 14,
    color: "#1A202C",
    marginTop: 2,
  },
});
