/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { Text, Button } from "react-native";

import { useSpotifyAuth } from "@/lib/spotify-auth";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import { useSpotifyActions } from "@/components/api";
import { Stack } from "expo-router";
import { UserPlaylists } from "@/components/user-playlists";
import { SearchResultsSkeleton } from "@/components/spotify/search-results";
import * as Form from "@/components/ui/Form";

export default function SpotifyCard() {
  const spotifyAuth = useSpotifyAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Spotify Profile",
          headerRight() {
            if (process.env.EXPO_OS === "ios") {
              return (
                <Button
                  title="Logout"
                  onPress={() => spotifyAuth.clearAccessToken()}
                />
              );
            }

            return (
              <Form.Text onPress={() => spotifyAuth.clearAccessToken()}>
                Logout
              </Form.Text>
            );
          },
        }}
      />

      {spotifyAuth.accessToken && <AuthenticatedPage />}
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
export function ErrorBoundary({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  const spotifyAuth = useSpotifyAuth();

  console.log("SpotifyError:", error);
  React.useEffect(() => {
    if (error.message.includes("access token expired")) {
      spotifyAuth?.clearAccessToken();
    }
  }, [error, spotifyAuth]);

  return (
    <Form.List>
      <Form.Section title="Error">
        <Text>{error.toString()}</Text>
        <Button title="Retry" onPress={retry} />
      </Form.Section>
    </Form.List>
  );
}
