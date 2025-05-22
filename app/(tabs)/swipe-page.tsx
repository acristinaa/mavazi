import CardStack, { CardStackHandle, SwipeDirection } from "@/components/swipe-page/card-stack";
import ClothingCard from "@/components/swipe-page/clothing-card";
import { SwipeButton } from "@/components/swipe-page/swipe-buttons";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ClothingItem = {
  id: string;
  name: string;
  image_url: string;
  owner: string;
  size: string;
};

export default function SwipePage() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [dislikedItems, setDislikedItems] = useState<ClothingItem[]>([]);
  const deckRef = useRef<CardStackHandle>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("clothing_images")
        .select("id, name, image_url, owner, size")
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) console.error(error);
      else setItems(data as ClothingItem[]);
    })();
  }, []);

  const handleSwipe = (dir: SwipeDirection, item: ClothingItem, index: number) => {
    if (dir === "right") {
      console.log("Liked", item.id);
      setItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      console.log("Disliked", item.id);
      setDislikedItems(prev => [...prev, item]);
      setItems(prev => prev.filter(i => i.id !== item.id));
    }

    // If we're out of items, add the disliked ones to the end
    if (items.length === 1) {
      setItems(prev => [...prev, ...dislikedItems]);
      setDislikedItems([]);
    }
  };

  if (!items.length) return <Text style={styles.loadingText}>It looks like you don&apos;t have any items to swap!</Text>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Time to swap!</Text>

        <View style={styles.cardContainer}>
          <CardStack
            ref={deckRef}
            data={items}
            renderCard={(item) => (
              <ClothingCard
                imageUrl={item.image_url}
                name={item.name}
                owner={item.owner}
                size={item.size}
                index={item.index}
              />
            )}
            onSwipe={handleSwipe}
          />
        </View>

        <View style={styles.buttonContainer}>
          <SwipeButton
            icon="thumbs-down"
            onPress={() => deckRef.current?.swipeLeft()}
            size={85}
          />
          <SwipeButton
            icon="cards-heart-outline"
            onPress={() => deckRef.current?.swipeRight()}
            size={85}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.black,
    marginTop: 50,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.darkPink,
    marginTop: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardContainer: {
    width: "80%",
    height: "70%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    gap: 40,
    marginTop: -60,
  },
});
