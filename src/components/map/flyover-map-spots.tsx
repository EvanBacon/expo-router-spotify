"use client";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity as TouchableBounce,
  View,
} from "react-native";
import { FlyoverMap } from "./flyover-map";
import { useState, useId } from "react";
import { BlurView } from "expo-blur";
import type { AI } from "@/lib/ai-actions";
import { useUIState, useAIState } from "ai/rsc";
import { Suggestions } from "@/components/suggestions";
// import TouchableBounce from '@/components/TouchableBounce';

export function FlyoverCard({
  locations,
}: {
  locations: {
    icon: string;
    title: string;
    latitude: number;
    longitude: number;
    altitude?: number;
    rating: number;
  }[];
}) {
  const [location, setLocation] = useState(locations[0]);
  const [width, setWidth] = useState(0);
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  const id = useId();
  return (
    <View
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
      }}
      style={{
        flex: 1,
        height: 360,
        maxHeight: 360,
        // borderRadius: 12,
        // overflow: 'hidden',
      }}
    >
      {location && (
        <FlyoverMap center={location} altitude={location?.altitude ?? 500} />
      )}
      <ScrollView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 96,
          // backgroundColor: "blue",
        }}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          const nextLocation = locations[index];
          console.log(nextLocation.title);
          if (nextLocation.title !== location.title) {
            setLocation(nextLocation);
          }
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 32,
          paddingBottom: 24,
        }}
      >
        {locations.map((value, index) => (
          <TouchableBounce
            key={index}
            style={{
              //   backgroundColor: '#191A20',
              flex: 1,
            }}
            onPress={() => {
              const coord = JSON.stringify({
                latitude: value.latitude,
                longitude: value.longitude,
              });
              const info = {
                role: "assistant" as const,
                content: `[User has selected location "${value.title}" at coordinate "${coord}"]`,

                // Identifier of this UI component, so we don't insert it many times.
                // id,
              };
              console.log(info);
              // If the last message is already inserted by us, update it. This is to avoid
              // adding every slider change to the AI state.
              if (aiState.messages[aiState.messages.length - 1]?.id === id) {
                setAIState({
                  ...aiState,
                  messages: [...aiState.messages.slice(0, -1), info],
                });
              } else {
                // If it doesn't exist, append it to the AI state.
                setAIState({
                  ...aiState,
                  messages: [...aiState.messages, info],
                });

                setMessages((messages) => [
                  ...messages,
                  {
                    display: (
                      <View key={String(id)} style={{ paddingHorizontal: 16 }}>
                        {/* <AssistantMessage key={String(id)}>{info.content}</AssistantMessage> */}
                        <Suggestions
                          suggestions={[
                            "Get the weather",
                            // 'Show me pictures',
                            "Book an Uber",
                          ]}
                        />
                      </View>
                    ),
                    id,
                  },
                ]);
              }
            }}
          >
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              tint="systemMaterialDark"
              style={{
                flex: 1,
                //   backgroundColor: '#191A20',
                borderRadius: 10,
                borderCurve: "continuous",
                width: width - 32,
                overflow: "hidden",
                padding: 16,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,

                  gap: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 48,
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: 1,
                    borderRadius: 999,
                    backgroundColor: "#353745",
                    padding: 12,
                  }}
                >
                  <Image
                    source={{ uri: value.icon }}
                    resizeMode="contain"
                    style={{
                      tintColor: "#EDEEE9",
                      flex: 1,
                      aspectRatio: 1,
                    }}
                  />
                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    maxWidth: "90%",
                    color: "#EDEEE9",
                    flexWrap: "wrap",
                    paddingRight: 16,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {value.title}
                </Text>

                {/* <Text style={{ color: '#EDEEE9', fontSize: 12, fontWeight: 'bold' }}>
                {value.rating}★
              </Text> */}
              </View>
            </BlurView>
          </TouchableBounce>
        ))}
      </ScrollView>
    </View>
  );
}
