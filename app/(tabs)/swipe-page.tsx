import "react-native-gesture-handler";
import { StyleSheet, View, Text, ScrollView, RefreshControl } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DataProvider, useData } from "../../components/data-context";
import CardDeck from "../../components/card-deck";
import EmptyState from "../../components/empty-state";
import useSwipeHandler from "../../components/swipe-handler";
import { useState, useCallback } from "react";

function SwipePageContent() {
  const { items, likedItems, skippedItems, currentIndex, handleLike, handleSkip, resetSwipes } = useData();
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const likeOpacity = useSharedValue(0);
  const skipOpacity = useSharedValue(0);
  const [refreshing, setRefreshing] = useState(false);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` }
    ]
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: likeOpacity.value,
  }));

  const skipStyle = useAnimatedStyle(() => ({
    opacity: skipOpacity.value,
  }));

  const gestureHandler = useSwipeHandler(
    translateX,
    rotate,
    likeOpacity,
    skipOpacity,
    handleLike,
    handleSkip
  );
 
  const resetCardPosition = () => {
    translateX.value = withSpring(0);
    rotate.value = withSpring(0);
    likeOpacity.value = withSpring(0);
    skipOpacity.value = withSpring(0);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    resetSwipes();
    resetCardPosition();
    setRefreshing(false);
  }, [resetSwipes]);

  const content = currentIndex >= items.length ? (
    <EmptyState likedCount={likedItems.length} skippedCount={skippedItems.length} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>time to swipe!</Text>
      <View style={styles.cardContainer}>
        <CardDeck
          data={items}
          currentIndex={currentIndex}
          gestureHandler={gestureHandler}
          cardStyle={cardStyle}
          likeStyle={likeStyle}
          skipStyle={skipStyle}
        />
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {content}
    </ScrollView>
  );
}

export default function SwipePage() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DataProvider>
        <SwipePageContent />
      </DataProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingBottom: 150,
  }
});