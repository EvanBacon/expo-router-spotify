// import { Image } from 'expo-image';
import { Text, View, Image } from "react-native";

export function UserMessage({ children }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        maxWidth: "100%",
        paddingHorizontal: 16,
        gap: 8,
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text
          numberOfLines={100}
          style={{
            borderCurve: "continuous",
            backgroundColor: "white",
            borderRadius: 20,
            flexWrap: "wrap",
            wordWrap: "break-word",
            textAlign: "right",
            color: "#102151",
            padding: 12,
            fontSize: 16,
          }}
          selectable
        >
          {children}
        </Text>
      </View>

      <Image
        source={require("../assets/evan.jpeg")}
        style={{
          overflow: "hidden",
          backgroundColor: "#83189F",
          borderRadius: 777,
          width: 48,
          height: 48,
        }}
      />
    </View>
  );
}
