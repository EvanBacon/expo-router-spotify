/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { Text, Button, View } from "react-native";

import SpotifyButton from "@/components/spotify/spotify-auth-button";
import { useSpotifyAuth } from "@/lib/spotify-auth";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import { useSpotifyActions } from "@/components/api";
import { Stack } from "expo-router";
import { UserPlaylists } from "@/components/user-playlists";
import { SearchResultsSkeleton } from "@/components/spotify/search-results";

export { SpotifyError as ErrorBoundary };

export default function SpotifyCard() {
  const spotifyAuth = useSpotifyAuth();

  if (!spotifyAuth.accessToken) {
    return <SpotifyButton />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Spotify Profile",
          headerRight() {
            return (
              <Button
                title="Logout"
                onPress={() => spotifyAuth.clearAccessToken()}
              />
            );
          },
        }}
      />

      <AuthenticatedPage />
    </>
  );
}

function AuthenticatedPage() {
  const text = useHeaderSearch();
  const actions = useSpotifyActions();

  if (!text) {
    return <UserPlaylists />;
  }

  return (
    <React.Suspense fallback={<SearchResultsSkeleton />}>
      {actions!.renderSongsAsync({ query: text, limit: 15 })}
    </React.Suspense>
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
