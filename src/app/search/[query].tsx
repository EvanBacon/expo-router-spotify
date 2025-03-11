/// <reference types="react/canary" />

"use client";

import * as React from "react";

import { useSpotifyAuth } from "@/lib/spotify-auth";
import { useSpotifyActions } from "@/components/api";
import { useLocalSearchParams } from "expo-router";
import { UserPlaylists } from "@/components/user-playlists";
import { SearchResultsSkeleton } from "@/components/spotify/search-results";

import { Text, Button } from "react-native";
import * as Form from "@/components/ui/Form";

export default function SearchPage() {
  const spotifyAuth = useSpotifyAuth();

  const text = useLocalSearchParams<{ query: string }>().query;
  const actions = useSpotifyActions();

  if (!spotifyAuth.accessToken) {
    return null;
  }

  //   return (
  //     <Form.List>
  //       <Form.Text>Query: "{text}"</Form.Text>
  //     </Form.List>
  //   );

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
