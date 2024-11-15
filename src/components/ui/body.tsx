"use client";

import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

export const BodyScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      {...props}
      ref={ref}
    />
  );
});
