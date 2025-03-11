"use client";

import * as React from "react";

import { SpotifyBrandButton } from "@/components/spotify-brand-button";
import { useSpotifyAuth } from "@/lib/spotify-auth";

export default function SpotifyAuthButton() {
  const { useSpotifyAuthRequest } = useSpotifyAuth();

  const [request, , promptAsync] = useSpotifyAuthRequest();

  return (
    <SpotifyBrandButton
      disabled={!request}
      style={{ margin: 16 }}
      title="Login with Spotify"
      onPress={() => promptAsync()}
    />
  );
}

export function LogoutButton() {
  const spotifyAuth = useSpotifyAuth();

  return (
    <SpotifyBrandButton
      title="Logout"
      style={{ marginHorizontal: 16, marginBottom: 16 }}
      onPress={() => spotifyAuth!.clearAccessToken()}
    />
  );
}
