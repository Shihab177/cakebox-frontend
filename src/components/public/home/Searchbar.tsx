import Fontisto from '@expo/vector-icons/Fontisto';
import { StyleSheet, TextInput, View } from "react-native";
const Searchbar = () => {
  return (
    <View style={styles.container}>
      <Fontisto name="search" size={20} color="#301F1F" />
      <TextInput
        style={[styles.input, { outline: "none" } as any]}
        placeholder="What are you looking for?"
        placeholderTextColor="#301F1F"
      />
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#301F1F",
  },
});
