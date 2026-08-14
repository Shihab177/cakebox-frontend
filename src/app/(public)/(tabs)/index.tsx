
import Categories from "@/components/public/home/Categories";
import PopularCakes from "@/components/public/home/PopularCakes";
import Searchbar from "@/components/public/home/Searchbar";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
           <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      
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
    
   marginBottom:10
  },
  container: {
    
    flex: 1,
  },
  
});
