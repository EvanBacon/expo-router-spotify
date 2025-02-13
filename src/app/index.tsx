/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { Text, Button, ScrollView, View } from "react-native";

import SpotifyButton from "@/components/spotify/spotify-auth-button";
import { SongItemSkeleton } from "@/components/songs";
import { useSpotifyAuth } from "@/lib/spotify-auth";
import { Try } from "expo-router/build/views/Try";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import { useSpotifyActions } from "@/components/api";
import { BodyScrollView } from "@/components/ui/body";
import { Stack } from "expo-router";
import { UserPlaylists } from "@/components/user-playlists";

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
      <BodyScrollView>
        <AuthenticatedPage />
      </BodyScrollView>
    </>
  );
}

function AuthenticatedPage() {
  const text = useHeaderSearch();

  if (!text) {
    return <UserPlaylists />;
  }

  return (
    <>
      <SongsScroller query={text} />
    </>
  );
}

export { SpotifyError as ErrorBoundary };

function SongsScroller({ query }: { query: string }) {
  const actions = useSpotifyActions();

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
    </>
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
