import { animated, useSprings } from "@react-spring/native";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

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
        config: { tension: 300, friction: 20 },
        onResolve: () => onSwipe(dir, data[i]),
      };
    });
  };

  const onGestureEvent = (cardIndex: number) => (event: any) => {
    const { translationX, velocityX } = event.nativeEvent;
    const down = event.nativeEvent.state === 2; // State.ACTIVE
    
    api.start((sprIdx) => {
      if (sprIdx !== cardIndex) return;
      
      const dir = translationX < 0 ? -1 : 1; // -1 = left, 1 = right
      const isGone = gone.has(cardIndex);
      const x = isGone ? (SCREEN_WIDTH + 100) * dir : down ? translationX : 0;
      const rot = translationX / 10;
      const scale = down ? 1.05 : 1;
      
      return { x, rot, scale, immediate: down };
    });
  };

  const onGestureEnd = (cardIndex: number) => (event: any) => {
    const { translationX, velocityX } = event.nativeEvent;
    const dir = translationX < 0 ? -1 : 1; // -1 = left, 1 = right
    
    if (Math.abs(velocityX) > 0.25 || Math.abs(translationX) > SWIPE_THRESHOLD) {
      gone.add(cardIndex);
      flyOut(dir === 1 ? "right" : "left");
    } else {
      // Return to center if not swiped far enough
      api.start(i => {
        if (i !== cardIndex) return;
        return { x: 0, rot: 0, scale: 1, immediate: false };
      });
    }
  };

  return (
    <>
      {springs.map(({ x, y, rot, scale }, i) => {
                                // Reverse the display order so cards at the beginning of the array 
                // are displayed on top
                const displayIndex = data.length - 1 - i;
                const isActive = displayIndex === data.length - 1 - gone.size;
        
                return (
                  <PanGestureHandler
                    key={displayIndex}
                    enabled={isActive}
                    onGestureEvent={isActive ? onGestureEvent(i) : undefined}
                    onHandlerStateChange={isActive ? onGestureEnd(i) : undefined}
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
