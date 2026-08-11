import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
type TPopularCakes = {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  ingredients: string[];
  reviewId?: string | null;
  price: number;
  qty: number;
};
const Popular = () => {
  const [popularCakes, setPopularCakes] = useState<TPopularCakes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const controller = new AbortController();
    const getPopularCakes = async () => {
      try {
        const response = await axios.get("http://192.168.0.106:3160/api/v1/cakes", {
          signal: controller.signal,
        });
        setPopularCakes(response.data?.data || []);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("API Error:", error);
        }
      }finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }}
    };
    getPopularCakes();
    return () => controller.abort();
  }, []);
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#301F1F" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionText}>POPULAR CAKES</Text>
      </View>
      <FlatList<TPopularCakes>
        data={popularCakes}
        keyExtractor={(item) => item._id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} style={styles.card}>
            <Image
              source={{ uri: item?.images?.[0] }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 12,
    color: "#301F1F",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  listContainer: {
    gap: 16,
  },
  card: {
    width: "48%",
  },
  cardImage: {
    width: "100%",
    height: 121,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#301F1F",
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: "#828282",
    fontWeight: "400",
    marginTop: 4,
    lineHeight: 16,
  },
});
