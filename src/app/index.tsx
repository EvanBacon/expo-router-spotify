/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { Button } from "react-native";

import { useSpotifyAuth } from "@/lib/spotify-auth";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import { useSpotifyActions } from "@/components/api";
import { Stack } from "expo-router";
import { UserPlaylists } from "@/components/user-playlists";
import { SearchResultsSkeleton } from "@/components/search-results";
import * as Form from "@/components/ui/Form";

export { SpotifyErrorBoundary as ErrorBoundary } from "@/components/spotify-error-boundary";

export default function MainRoute() {
  const { clearAccessToken, auth } = useSpotifyAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Expo Spotify",
          headerRight() {
            if (process.env.EXPO_OS === "ios") {
              return <Button title="Logout" onPress={clearAccessToken} />;
            }

            return (
              <Form.Text onPress={clearAccessToken} style={{ marginRight: 16 }}>
                Logout
              </Form.Text>
            );
          },
        }}
      />

      {auth?.access_token && <AuthenticatedPage />}
    </>
  );
}

function AuthenticatedPage() {
  const text = useHeaderSearch();
  const { renderSongsAsync } = useSpotifyActions();

  if (!text) {
    return <UserPlaylists />;
  }

  return (
    <React.Suspense fallback={<SearchResultsSkeleton />}>
      {renderSongsAsync({ query: text, limit: 15 })}
    </React.Suspense>
  );
}
