import React, { forwardRef, useImperativeHandle } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;

export type SwipeDirection = "left" | "right";

export interface CardStackHandle {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface CardStackProps<T> {
  data: T[];
  renderCard: (item: T) => React.ReactElement;
  onSwipe: (dir: SwipeDirection, item: T, index: number) => void;
}

export default forwardRef<CardStackHandle, CardStackProps<any>>(function CardStack(
  { data, renderCard, onSwipe },
  ref
) {
  useImperativeHandle(ref, () => ({
    swipeLeft: () => onSwipe("left", data[0], 0),
    swipeRight: () => onSwipe("right", data[0], 0),
  }));

  const onGestureStateChange = (cardIndex: number) => ({ nativeEvent }: any) => {
    const { state, translationX } = nativeEvent;
    
    if (state === State.END) {
      const dir = translationX < 0 ? "left" : "right";
      if (Math.abs(translationX) > SWIPE_THRESHOLD) {
        onSwipe(dir, data[cardIndex], cardIndex);
      }
    }
  };

  return (
    <>
      {data.map((item, i) => (
        <PanGestureHandler
          key={i}
          activeOffsetX={[-10, 10]}
          failOffsetY={[-10, 10]}
          onHandlerStateChange={onGestureStateChange(i)}
        >
          <View style={[styles.card, { zIndex: data.length - i }]}>
            {renderCard({...item, index: i})}
          </View>
        </PanGestureHandler>
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
