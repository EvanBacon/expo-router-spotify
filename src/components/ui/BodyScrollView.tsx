"use client";

import useMergedRef from "@/hooks/useMergedRef";
import { useScrollToTop } from "@/hooks/useTabToTop";
import * as AC from "@bacons/apple-colors";
import { useRef } from "react";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabOverflow } from "./TabBarBackground";

export function BodyScrollView(props) {
  const paddingBottom = useBottomTabOverflow();
  const scrollRef = useRef(null);

  const statusBarInset = useSafeAreaInsets().top; // inset of the status bar

  const largeHeaderInset = statusBarInset + 92; // inset to use for a large header since it's frame is equal to 96 + the frame of status bar

  useScrollToTop(scrollRef, -largeHeaderInset);

  const merged = useMergedRef(scrollRef, props.ref);

  return (
    <Animated.ScrollView
      scrollToOverflowEnabled
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{
        bottom: paddingBottom,
        top: process.env.EXPO_OS === "web" ? 60 : undefined,
      }}
      scrollIndicatorInsets={{ bottom: paddingBottom }}
      {...props}
      style={[{ backgroundColor: AC.systemGroupedBackground }, props.style]}
      ref={merged}
    />
  );
}

if (__DEV__) {
  BodyScrollView.displayName = "BodyScrollView";
}
