"use client";

import * as Form from "@/components/ui/Form";
import { View } from "react-native";
import * as AC from "@bacons/apple-colors";
import { Image } from "expo-image";

import { SpotifySongData } from "@/lib/spotify-auth";
import React from "react";
import { ContentUnavailable } from "./ui/ContentUnavailable";

function formatFollowers(followers: number) {
  if (followers < 1000) {
    return `${followers}`;
  }
  if (followers < 1000000) {
    return `${Math.round(followers / 1000)}k`;
  }
  return `${Math.round(followers / 1000000)}m`;
}

export default function SearchResults({
  query,
  data,
}: {
  query: string;
  data: SpotifySongData;
}) {
  const [showAllArtists, setShowAllArtists] = React.useState(false);
  return (
    <>
      <Form.List>
        {/* <Form.Section>
          <Form.Text hint={String(data.tracks?.total)}>Tracks</Form.Text>
          {data.description && (
            <Form.Text hint={data.description}>Description</Form.Text>
          )}
        </Form.Section> */}

        {data.artists?.items && (
          <Form.Section
            title="Artists"
            footer={
              showAllArtists ? null : (
                <Form.Text
                  onPress={() => {
                    setShowAllArtists((show) => !show);
                  }}
                >
                  Show all...
                </Form.Text>
              )
            }
          >
            {data.artists?.items
              ?.slice(0, showAllArtists ? data.artists.items.length : 3)
              .map((item) => {
                return (
                  <Form.Link
                    target="_blank"
                    key={item.id}
                    href={item.external_urls.spotify}
                    style={{ flexWrap: "wrap", flexDirection: "row", gap: 16 }}
                  >
                    <Image
                      transition={200}
                      source={{ uri: item.images?.[0]?.url }}
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
                        {item.name}
                      </Form.Text>
                      <Form.Text style={{ fontSize: 14 }}>
                        {formatFollowers(item.followers.total)} followers
                      </Form.Text>
                    </View>
                  </Form.Link>
                );
              })}
          </Form.Section>
        )}
        <Form.Section title="Songs">
          {!data.tracks?.items.length && <ContentUnavailable search={query} />}
          {data.tracks?.items?.map((item) => {
            return (
              <Form.Link
                target="_blank"
                key={item.id}
                href={item.external_urls.spotify}
                style={{ flexWrap: "wrap", flexDirection: "row", gap: 16 }}
              >
                <Image
                  transition={200}
                  source={{ uri: item.album.images?.[0]?.url }}
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
                    {item.name}
                  </Form.Text>
                  <Form.Text style={{ fontSize: 14 }}>
                    {item.artists.map((artist) => artist.name).join(", ")}
                  </Form.Text>
                </View>
              </Form.Link>
            );
          })}
        </Form.Section>

        <Form.Section title="Albums">
          {!data.albums?.items.length && <ContentUnavailable search={query} />}
          {data.albums?.items?.map((item) => {
            return (
              <Form.Link
                target="_blank"
                key={item.id}
                href={item.external_urls.spotify}
                style={{ flexWrap: "wrap", flexDirection: "row", gap: 16 }}
              >
                <Image
                  transition={200}
                  source={{ uri: item.images?.[0]?.url }}
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
                    {item.name}
                  </Form.Text>
                  <Form.Text style={{ fontSize: 14 }}>
                    {item.artists.map((artist) => artist.name).join(", ")}
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

export function SearchResultsSkeleton() {
  return (
    <>
      <Form.List scrollEnabled={false} nestedScrollEnabled={false}>
        <Form.Section title="Artists">
          {[0, 0, 0].map((item, index) => {
            return (
              <Form.Link
                key={String(index)}
                href={"#"}
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
                      fontSize: 18,
                      fontWeight: "600",
                      borderRadius: 4,
                      color: "transparent",

                      backgroundColor: AC.systemGray4,
                    }}
                  >
                    Artist Name
                  </Form.Text>
                  <Form.Text
                    style={{
                      fontSize: 12,
                      color: "transparent",
                      borderRadius: 4,
                      backgroundColor: AC.systemGray4,
                    }}
                  >
                    3M followers
                  </Form.Text>
                </View>
              </Form.Link>
            );
          })}
        </Form.Section>

        <Form.Section title="Songs">
          {[0, 0, 0, 0, 0, 0].map((item, index) => {
            return (
              <Form.Link
                key={String(index)}
                href={"#"}
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
                      borderRadius: 4,
                      backgroundColor: AC.systemGray4,
                    }}
                  >
                    Song Name
                  </Form.Text>
                  <Form.Text
                    style={{
                      fontSize: 14,
                      color: "transparent",
                      backgroundColor: AC.systemGray4,
                      borderRadius: 4,
                    }}
                  >
                    {"Artist Name, Artist Name"}
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
