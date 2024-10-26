'use client';

import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Linking,
  StyleSheet,
  TouchableOpacity as TouchableBounce,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';

export default function ExternalLink({ href, ...props }: TouchableOpacityProps & { href: string }) {
  return (
    <TouchableBounce
      {...props}
      onPress={() => {
        Linking.openURL(href);
      }}
    />
  );
}

export function AnimatedSwap({ childA, childB, on, style }) {
  return (
    <>
      <SwapSlot style={style} show={on}>
        {childA}
      </SwapSlot>
      <SwapSlot style={style} show={!on}>
        {childB}
      </SwapSlot>
    </>
  );
}

function SwapSlot({ style, show, ...props }: ViewProps & { show?: boolean }) {
  const animatedValue = useRef(new Animated.Value(show ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: show ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [show]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        style,
        {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 1],
              }),
            },
          ],
        },
      ]}
      {...props}
    />
  );
}

export function SubtleScaleAndFadeIn({ delay, ...props }: ViewProps & { delay?: number }) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      delay,
      duration: 500,
      useNativeDriver: true,

      easing: Easing.out(Easing.ease),
    }).start();
  }, [delay]);

  return (
    <Animated.View
      {...props}
      style={[
        props.style,
        {
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 2],
          }),

          //
          transform: [
            // Slide in from the left a little bit
            // {
            //   translateX: animation.interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [-100, 0],
            //   }),
            // },
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.7, 1],
              }),
            },
          ],
        },
      ]}
    />
  );
}
