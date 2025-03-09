"use client";

import type { SpotifyPlaylistData, SpotifyUserData } from "./spotify-api-types";

import * as Form from "@/components/ui/Form";
import { Image, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Stack } from "expo-router";

export default function Playlist({
  data,
  user,
}: {
  data: SpotifyPlaylistData;
  user: SpotifyUserData;
}) {
  const ref = useAnimatedRef();
  const scroll = useScrollViewOffset(ref);
  const style = useAnimatedStyle(() => {
    if (process.env.EXPO_OS === "web") {
      return {};
    }
    return {
      opacity: interpolate(scroll.value, [0, 30], [0, 1], "clamp"),
      transform: [
        { translateY: interpolate(scroll.value, [0, 30], [5, 0], "clamp") },
      ],
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle() {
            return (
              <Animated.Image
                source={{ uri: data.images?.[0]?.url }}
                style={[
                  style,
                  {
                    aspectRatio: 1,
                    height: 30,
                    borderRadius: 8,
                    borderWidth: 0.5,
                    borderColor: AC.separator,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Form.List ref={ref} navigationTitle={""}>
        <Form.Section>
          <View style={{ alignItems: "center", gap: 8, padding: 16, flex: 1 }}>
            <Image
              source={{
                uri: data.images?.[0]?.url,
              }}
              style={{
                width: 200,
                height: 200,
                //   aspectRatio: 1,
                borderRadius: 8,
              }}
            />
            <Form.Text
              style={{ fontSize: 24, textAlign: "center", fontWeight: "600" }}
            >
              {data.name}
            </Form.Text>
          </View>

          {data.owner && (
            <Form.Link
              target="_blank"
              href={data.owner?.external_urls?.spotify}
              hintImage={{
                name: "person.fill.badge.plus",
                size: 24,
                color: AC.systemBlue,
                animationSpec: {
                  effect: {
                    type: "pulse",
                  },
                  repeating: true,
                },
              }}
            >
              {user && (
                <Form.HStack style={{ gap: 16 }}>
                  <Image
                    source={{ uri: user.images?.[0]?.url }}
                    style={{
                      aspectRatio: 1,
                      height: 48,
                      borderRadius: 999,
                    }}
                  />
                  <View style={{ gap: 4 }}>
                    <Form.Text style={Form.FormFont.default}>
                      {user.display_name}
                    </Form.Text>
                    <Form.Text style={Form.FormFont.caption}>
                      {user.followers.total} followers
                    </Form.Text>
                  </View>
                </Form.HStack>
              )}
            </Form.Link>
          )}
        </Form.Section>
        <Form.Section>
          <Form.Text hint={String(data.tracks?.total)}>Tracks</Form.Text>
          {data.description && (
            <Form.Text hint={data.description}>Description</Form.Text>
          )}
        </Form.Section>
        <Form.Section>
          {data.tracks?.items?.map((item) => {
            return (
              <Form.Link
                key={item.track.id}
                href={item.track.external_urls.spotify}
                style={{ flexWrap: "wrap", flexDirection: "row", gap: 16 }}
              >
                <Image
                  source={{ uri: item.track?.album?.images?.[0]?.url }}
                  style={{
                    aspectRatio: 1,
                    height: 64,
                    borderRadius: 8,
                    backgroundColor: AC.systemGray3,
                  }}
                />
                <View
                  style={{
                    flexShrink: 1,
                  }}
                >
                  <Form.Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                    }}
                  >
                    {item.track.name}
                  </Form.Text>
                  <Form.Text style={{ fontSize: 14 }}>
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </Form.Text>
                </View>
              </Form.Link>
            );
          })}
        </Form.Section>
      </Form.List>
    </>
  );
}
