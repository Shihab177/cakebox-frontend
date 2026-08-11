import { ScrollView, StyleSheet } from "react-native";
import Searchbar from "./components/home/Searchbar";
import Categories from "./components/home/Categories";
import Popular from "./components/home/Popular";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
           <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Searchbar />
      <Categories />
      <Popular />
    </ScrollView>
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
});
