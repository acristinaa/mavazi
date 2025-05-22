import { animated, useSprings } from "@react-spring/native";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
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
  onSwipe: (dir: SwipeDirection, item: T) => void;
}

export default forwardRef<CardStackHandle, CardStackProps<any>>(function CardStack(
  { data, renderCard, onSwipe },
  ref
) {
  const [gone] = useState(() => new Set<number>());

  const to = (_i: number) => ({
    x: 0,
    y: 0,
    scale: 1,
    rot: 0,
    delay: _i * 50,
  });
  const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: SCREEN_WIDTH });

  const [springs, api] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  useImperativeHandle(ref, () => ({
    swipeLeft: () => flyOut("left"),
    swipeRight: () => flyOut("right"),
  }));

  const flyOut = (dir: SwipeDirection) => {
    const activeIndex = data.length - 1 - gone.size;
    if (activeIndex < 0) return;

    gone.add(activeIndex);
    const x = dir === "left" ? -SCREEN_WIDTH * 1.1 : SCREEN_WIDTH * 1.1;

    api.start((i) => {
      if (i !== activeIndex) return;
      return {
        x,
        rot: dir === "left" ? -45 : 45,
        scale: 1,
        y: 0,
        config: { tension: 500, friction: 25 },
        onRest: () => onSwipe(dir, data[i]),
      };
    });
  };

  const onGestureEvent = (cardIndex: number) => ({ nativeEvent }: any) => {
    const { translationX } = nativeEvent;
    
    api.start((i) => {
      if (i !== cardIndex) return;
      
      const dir = translationX < 0 ? -1 : 1;
      const isGone = gone.has(cardIndex);
      const x = isGone ? (SCREEN_WIDTH + 100) * dir : translationX;
      const rot = translationX / 15;
      
      return { 
        x, 
        rot, 
        scale: 1.02, 
        immediate: true 
      };
    });
  };

  const onGestureStateChange = (cardIndex: number) => ({ nativeEvent }: any) => {
    const { state, translationX, velocityX } = nativeEvent;
    
    if (state === State.END) {
      const dir = translationX < 0 ? -1 : 1;
      
      if (Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > 0.2) {
        gone.add(cardIndex);
        const swipeDirection = dir === 1 ? "right" : "left";
        
        api.start((i) => {
          if (i !== cardIndex) return;
          return {
            x: dir === 1 ? SCREEN_WIDTH * 1.1 : -SCREEN_WIDTH * 1.1,
            rot: dir === 1 ? 45 : -45,
            config: { tension: 500, friction: 25 },
            onRest: () => onSwipe(swipeDirection, data[i]),
          };
        });
      } else {
        api.start(i => {
          if (i !== cardIndex) return;
          return { 
            x: 0, 
            rot: 0, 
            scale: 1, 
            config: { tension: 500, friction: 25 } 
          };
        });
      }
    }
  };

  return (
    <>
      {springs.map(({ x, y, rot, scale }, i) => {
        const displayIndex = data.length - 1 - i;
        const isActive = displayIndex === data.length - 1 - gone.size;
        
        return (
          <PanGestureHandler
            key={displayIndex}
            activeOffsetX={[-10, 10]}
            failOffsetY={[-10, 10]}
            onGestureEvent={onGestureEvent(i)}
            onHandlerStateChange={onGestureStateChange(i)}
          >
            <animated.View
              style={[
                styles.card,
                {
                  transform: [
                    { translateX: x },
                    { translateY: y },
                    { rotate: rot.to(r => `${r}deg`) },
                    { scale },
                  ],
                  zIndex: data.length - displayIndex,
                },
              ]}
            >
              {renderCard({...data[displayIndex], index: displayIndex})}
            </animated.View>
          </PanGestureHandler>
        );
      })}
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
