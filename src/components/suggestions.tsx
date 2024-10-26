import { ViewStyle, Text, View } from "react-native";

import { SubtleScaleAndFadeIn } from "./external-link";
import { PromptOnTap } from "./prompt-on-tap";
import SparkleSvg from "@/components/svg/sparkle";

export function Suggestions({
  suggestions,
  style,
}: {
  suggestions: (string | [string, string])[];
  style?: ViewStyle;
}) {
  return (
    <View style={[{ gap: 8, alignItems: "flex-start" }, style]}>
      {suggestions.map((suggestion, index) => (
        <PromptOnTap
          activeOpacity={0.7}
          key={index}
          prompt={suggestion}
          style={{}}
        >
          <SubtleScaleAndFadeIn delay={100 * index}>
            <View
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "white",
                flexDirection: "row",
                gap: 4,
                flexGrow: 0,
                alignItems: "center",
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <SparkleSvg
                style={{ transform: [{ scale: 0.8 }] }}
                fill={"white"}
              />
              <Text
                style={{
                  fontFamily: "AnonymousPro-Bold",
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {Array.isArray(suggestion) ? suggestion[0] : suggestion}
              </Text>
            </View>
          </SubtleScaleAndFadeIn>
        </PromptOnTap>
      ))}
    </View>
  );
}
