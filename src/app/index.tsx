import Categories from "@/components/home/Categories";
import PopularCakes from "@/components/home/PopularCakes";
import Searchbar from "@/components/home/Searchbar";
import { ScrollView, StyleSheet } from "react-native";
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
