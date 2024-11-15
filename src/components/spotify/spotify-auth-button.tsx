"use client";

import * as React from "react";

import { SpotifyBrandButton } from "./spotify-brand-button";
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
