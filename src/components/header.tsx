"use client";

import ComposeSvg from "@/components/svg/compose";
import MenuSvg from "@/components/svg/menu";
import { BlurView } from "expo-blur";

import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HEADER_HEIGHT = 48;

export function Header() {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView
      tint="systemChromeMaterialDark"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: top,
        height: HEADER_HEIGHT + top,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{ width: 48, justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity onPress={() => {}}>
          <MenuSvg />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          //   fontFamily: 'AnonymousPro-Regular',
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Expo Router × AI
      </Text>
      <View
        style={{ width: 48, justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity onPress={() => {}}>
          <ComposeSvg />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}
