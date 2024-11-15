/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { Text, Button, ScrollView, View } from "react-native";

import SpotifyButton from "./spotify-auth-button";
import { SpotifyBrandButton } from "./spotify-brand-button";
import { SongItemSkeleton } from "./songs";
import { useSpotifyAuth } from "@/lib/spotify-auth";
import { Try } from "expo-router/build/views/Try";
import { SpotifyActionsContext } from "./spotify-actions";

export default function SpotifyCard({ query }: { query: string }) {
  const spotifyAuth = useSpotifyAuth();

  if (!spotifyAuth.accessToken) {
    return <SpotifyButton />;
  }

  return <AuthenticatedPage query={query} />;
}

function AuthenticatedPage({ query }: { query: string }) {
  const actions = React.use(SpotifyActionsContext);

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
            {actions!.renderSongsAsync({ query, limit: 15 })}
          </React.Suspense>
        </Try>
      </ScrollView>
      <LogoutButton />
    </>
  );
}

function LogoutButton() {
  const spotifyAuth = useSpotifyAuth();

  return (
    <SpotifyBrandButton
      title="Logout"
      style={{ marginHorizontal: 16, marginBottom: 16 }}
      onPress={() => spotifyAuth!.clearAccessToken()}
    />
  );
}

// NOTE: This won't get called because server action invocation happens at the root :(
function SpotifyError({ error, retry }: { error: Error; retry: () => void }) {
  const spotifyAuth = useSpotifyAuth();

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
