import { useEffect, useState } from "react";
import axios from "axios";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
type TCategory = {
  _id: string;
  name: string;
  title: string;
  image: string;
};
type TCategories = TCategory[];

const Categories = () => {
  const [categories, setCategories] = useState<TCategories>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.106:3160/api/v1/categories",
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>CATEGORIES</Text>
        <Text style={{ color: "#FF7800", fontWeight: "medium" }}>SEE ALL</Text>
      </View>
      <FlatList<TCategory>
        data={categories}
        keyExtractor={(item) => item?._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item?.image }}
            style={styles.cardImage}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item?.name}</Text>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 12,
    color: "#301F1F",
    fontWeight: "medium",
    letterSpacing: 0.5,
  },
  cardImage: {
    width: 105,
    height: 120,
    overflow: "hidden",
    borderRadius: 8,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "100%",
  },
  title: {
    position: "absolute",
    bottom: 8,
    left: 10,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "medium",
  },
});
