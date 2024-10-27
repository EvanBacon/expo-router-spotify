import { Text, View, ViewProps } from "react-native";

export function Card({
  style,
  title,
  children,
}: ViewProps & { title?: string }) {
  return (
    <View style={{ paddingHorizontal: 16, gap: 8, flex: 1 }}>
      {title && (
        <Text
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      )}
      <View
        style={[
          {
            padding: 16,
            maxWidth: 608,
            borderCurve: "continuous",
            borderRadius: 12,
            gap: 8,
            flexShrink: 0,
            overflow: "hidden",
            backgroundColor: "white",
          },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
}
