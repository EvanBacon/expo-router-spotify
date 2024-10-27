"use client";
import { Linking, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function ExternalLink({
  href,
  ...props
}: TouchableOpacityProps & { href: string }) {
  return <TouchableOpacity {...props} onPress={() => Linking.openURL(href)} />;
}
