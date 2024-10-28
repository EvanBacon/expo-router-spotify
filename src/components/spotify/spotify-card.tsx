/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { Text, Button, ScrollView, View } from "react-native";

import SpotifyButton, { SpotifyProxyButton } from "./spotify-auth-button";
import { SpotifyBrandButton } from "./spotify-brand-button";
import { SongItemSkeleton } from "./songs";
import { SpotifyAuthContext } from "./spotify-client-provider";
import { Try } from "expo-router/build/views/Try";

export default function SpotifyCard({ query }: { query: string }) {
  const spotifyAuth = React.use(SpotifyAuthContext);

  if (!spotifyAuth?.accessToken) {
    if (process.env.EXPO_OS === "ios") {
      return <SpotifyProxyButton />;
    }
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
          <React.Suspense
            fallback={
              <>
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
              </>
            }
          >
            {spotifyAuth.searchSongs({ query, limit: 15 })}
          </React.Suspense>
        </Try>
      </ScrollView>
      <SpotifyBrandButton
        title="Logout"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
        onPress={() => spotifyAuth.clearAccessToken()}
      />
    </>
  );
}

// NOTE: This won't get called because server action invocation happens at the root :(
function SpotifyError({ error, retry }: { error: Error; retry: () => void }) {
  const spotifyAuth = React.use(SpotifyAuthContext);

  console.log("SpotifyError:", error);
  React.useEffect(() => {
    if (error.message.includes("access token expired")) {
      spotifyAuth?.clearAccessToken();
    }
  }, [error, spotifyAuth]);

  return (
    <View>
      <Text>{error.toString()}</Text>
      <Button title="Retry" onPress={retry} />
    </View>
  );
}
