import { Redirect, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen() {
  const router = useRouter();
  const handleNavigateToOrders = () => {
    router.push("/orders");
  };
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View>
        <Text>profile screen</Text>
        <Text onPress={handleNavigateToOrders}>order</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    paddingBottom: 10,
  },
  container: {
    flex: 1,
  },
});
