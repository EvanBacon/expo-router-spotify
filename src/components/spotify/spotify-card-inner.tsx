"use client";

import * as React from "react";
import { Text, Button, ScrollView, View } from "react-native";

import SpotifyButton from "./spotify-auth-button";
import { SpotifyBrandButton } from "./spotify-brand-button";
import { SongItem, SongItemSkeleton } from "./songs";
import { SpotifyAuthContext, SpotifySongData } from "./spotify-provider";
import { Try } from "expo-router/build/views/Try";

export default function SpotifyCard({ query }: { query: string }) {
  const spotifyAuth = React.use(SpotifyAuthContext);

  if (!spotifyAuth.accessToken) {
    return <SpotifyButton />;
  }

  return (
    <>
      <ScrollView
        horizontal
        contentContainerStyle={{
          gap: 8,
          padding: 16,
        }}
      >
        <Try catch={SpotifyError}>
          <DoRender query={query} />
        </Try>
      </ScrollView>
      <SpotifyBrandButton
        title="Logout"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
        onPress={() => {
          spotifyAuth.clearAccessToken();
        }}
      />
    </>
  );
}

function DoRender({ query }: { query: string }) {
  const spotifyAuth = React.use(SpotifyAuthContext);

  const [error, setError] = React.useState<Error | null>(null);
  const [data, setData] = React.useState<SpotifySongData | null>(null);

  React.useEffect(() => {
    spotifyAuth
      .searchSongs({ query, limit: 15 })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setError(e);
      });
  }, [query, spotifyAuth.accessToken]);

  if (error) {
    throw error;
  }

  if (!data) {
    return (
      <>
        <SongItemSkeleton />
        <SongItemSkeleton />
        <SongItemSkeleton />
      </>
    );
  }
  return (
    <>
      {data.tracks.items.map((track: any) => (
        <SongItem
          href={track.external_urls.spotify}
          key={track.id}
          image={track.album.images[0].url}
          title={track.name}
          artist={track.artists.map((artist) => artist.name).join(", ")}
        />
      ))}
    </>
  );
}

// NOTE: This won't get called because the invocation happens at the root :(
function SpotifyError({ error, retry }) {
  const spotifyAuth = React.use(SpotifyAuthContext);

  console.log("SpotifyError:", error);
  React.useEffect(() => {
    if (error.message.includes("access token expired")) {
      spotifyAuth.clearAccessToken();
    }
  }, [error, spotifyAuth]);

  return (
    <View>
      <Text>{error.toString()}</Text>
      <Button title="Retry" onPress={retry} />
    </View>
  );
}
