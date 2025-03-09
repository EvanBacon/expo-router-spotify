/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { Text, Button, View, Image } from "react-native";

import SpotifyButton from "@/components/spotify/spotify-auth-button";
import { useSpotifyAuth } from "@/lib/spotify-auth";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import { useSpotifyActions } from "@/components/api";
import { Stack } from "expo-router";
import { UserPlaylists } from "@/components/user-playlists";
import { SearchResultsSkeleton } from "@/components/spotify/search-results";
import * as Form from "@/components/ui/Form";

export { SpotifyError as ErrorBoundary };

export default function SpotifyCard() {
  const spotifyAuth = useSpotifyAuth();

  if (!spotifyAuth.accessToken) {
    return (
      <Form.List navigationTitle="Expo Spotify">
        <Form.Section>
          <View style={{ alignItems: "center", gap: 8, padding: 8, flex: 1 }}>
            <Image
              source={{ uri: "https://github.com/expo.png" }}
              style={{
                aspectRatio: 1,
                height: 64,
                borderRadius: 8,
              }}
            />

            <SpotifyButton />
          </View>
        </Form.Section>
        <Form.Section>
          <Form.Link
            target="_blank"
            href="https://github.com/evanbacon/expo-router-spotify"
          >
            View Source
          </Form.Link>
        </Form.Section>
      </Form.List>
    );
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
