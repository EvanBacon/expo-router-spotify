"use client";

import type { SpotifyPaging, SpotifyPlaylist } from "./spotify-api-types";

import * as Form from "@/components/ui/Form";
import { View } from "react-native";
import * as AC from "@bacons/apple-colors";
import { Image } from "expo-image";

export default function UserPlaylistsServer({
  data,
}: {
  data: SpotifyPaging<SpotifyPlaylist>;
}) {
  return (
    <>
      <Form.List>
        <Form.Section>
          {data.items
            .filter((playlist) => {
              return playlist.tracks.total > 0;
            })
            .map((playlist) => {
              // Get the best quality image, or use placeholder if no images
              const imageUrl = playlist.images?.[0]?.url ?? "/placeholder.png";

              return (
                <Form.Link
                  key={playlist.id}
                  href={`/playlist/${playlist.id}`}
                  style={{ flexWrap: "wrap", flexDirection: "row", gap: 16 }}
                >
                  <Image
                    transition={500}
                    source={{ uri: imageUrl }}
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
                      {playlist.name}
                    </Form.Text>
                    <Form.Text style={{ fontSize: 14 }}>
                      {playlist.tracks.total} tracks
                    </Form.Text>
                    {!!playlist.description && (
                      <Form.Text style={{ fontSize: 14 }}>
                        {playlist.description}
                      </Form.Text>
                    )}
                  </View>
                </Form.Link>
              );
            })}
        </Form.Section>
      </Form.List>
    </>
  );
}

export function UserPlaylistsSkeleton() {
  return (
    <>
      <Form.List>
        <Form.Section>
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => {
            return (
              <Form.Link
                key={String(index)}
                href={`#`}
                disabled
                style={{ flexWrap: "wrap", flexDirection: "row", gap: 16 }}
              >
                <View
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
                    gap: 4,
                  }}
                >
                  <Form.Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: "transparent",
                      backgroundColor: AC.systemGray4,
                      borderRadius: 4,
                    }}
                  >
                    Playlist name
                  </Form.Text>
                  <Form.Text
                    style={{
                      fontSize: 14,
                      color: "transparent",
                      backgroundColor: AC.systemGray4,
                      borderRadius: 4,
                    }}
                  >
                    25 tracks
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
