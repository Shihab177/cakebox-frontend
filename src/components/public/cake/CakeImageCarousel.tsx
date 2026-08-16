import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_CONTAINER_WIDTH = SCREEN_WIDTH - 40;

interface CakeImageCarouselProps {
  images?: string[];
}

export const CakeImageCarousel = ({ images }: CakeImageCarouselProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const imageList = images && images.length > 0 ? images : ["https://via.placeholder.com/400"];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / IMAGE_CONTAINER_WIDTH);
    setActiveImageIndex(currentIndex);
  };

  return (
    <View style={styles.imageSectionContainer}>
      <FlatList
        data={imageList}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.cakeImage} resizeMode="cover" />
        )}
      />

      {imageList.length > 1 && (
        <View style={styles.paginationContainer}>
          {imageList.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeImageIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageSectionContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    height: 260,
  },
  cakeImage: {
    width: IMAGE_CONTAINER_WIDTH,
    height: 260,
    borderRadius: 8,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 10,
    backgroundColor: "#FF7A28",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "#FFFFFF",
    opacity: 0.8,
  },
});