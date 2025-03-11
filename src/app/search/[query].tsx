/// <reference types="react/canary" />

"use client";

import * as React from "react";

import { useSpotifyAuth } from "@/lib/spotify-auth";
import { useSpotifyActions } from "@/components/api";
import { useLocalSearchParams } from "expo-router";
import { UserPlaylists } from "@/components/user-playlists";
import { SearchResultsSkeleton } from "@/components/search-results";

export { SpotifyErrorBoundary as ErrorBoundary } from "@/components/spotify-error-boundary";

export default function SearchPage() {
  const spotifyAuth = useSpotifyAuth();

  const text = useLocalSearchParams<{ query: string }>().query;
  const actions = useSpotifyActions();

  if (!spotifyAuth.accessToken) {
    return null;
  }

  if (!text) {
    return <UserPlaylists />;
  }

  return (
    <React.Suspense fallback={<SearchResultsSkeleton />}>
      {actions!.renderSongsAsync({ query: text, limit: 15 })}
    </React.Suspense>
  );
}
