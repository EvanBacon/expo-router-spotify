import SpotifySvg from "@/components/svg/spotify";
import * as React from "react";
import { Text, TouchableHighlight, ViewStyle } from "react-native";

export function SpotifyBrandButton({
  title,
  disabled,
  onPress,
  style,
}: {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}) {
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: "#1DB954",
          flexDirection: "row",
          borderRadius: 6,
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
          padding: 12,
        },
        style,
      ]}
      underlayColor="#1ED760"
    >
      <>
        <SpotifySvg style={{ width: 24, height: 24 }} />
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
      </>
    </TouchableHighlight>
  );
}
