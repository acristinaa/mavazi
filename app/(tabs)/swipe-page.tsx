import ClothingCard from "@/components/swipe-page/clothing-card";
import { SwipeButton } from "@/components/swipe-page/swipe-buttons";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { supabase } from '../../lib/supabaseClient';

type ClothingItem = {
  name: string;
  image_url: string;
  owner: string;
  size: string;
};

export default function SwipePage() {
  const [clothingItem, setClothingItem] = useState<ClothingItem | null>(null);

  useEffect(() => {
    const fetchClothingItem = async () => {
      const { data, error } = await supabase
        .from('clothing_images')
        .select('name, image_url, owner, size')
        .eq('id', '13bc76eb-c449-4061-9aad-37930354bf71')
        .single();

      if (error) {
        console.error('Error fetching clothing item:', error);
      } else {
        setClothingItem(data);
      }
    };

    fetchClothingItem();
  }, []);

  if (!clothingItem) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Time to swipe!</Text>

      <View style={styles.cardContainer}>
        <ClothingCard 
          imageUrl={clothingItem.image_url} 
          name={clothingItem.name} 
          owner={clothingItem.owner} 
          size={clothingItem.size} 
        />
      </View>

      <View style={styles.buttonContainer}>
        <SwipeButton onPress={() => {}} size={85}/>
      </View>
    </View>
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
    color: Colors.light.dubaiChocolate,
    marginTop: 50,
  },
  cardContainer: {
    width: "80%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    marginTop: -40,
    gap: 40,
  },
});