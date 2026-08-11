import { ScrollView, StyleSheet } from "react-native";
import Searchbar from "./components/home/Searchbar";
import Categories from "./components/home/Categories";

import { SafeAreaView } from "react-native-safe-area-context";
import PopularCakes from "./components/home/PopularCakes";
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
      <PopularCakes />
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
