"use client";

import * as React from "react";

import { SpotifyBrandButton } from "./spotify-brand-button";
import { SpotifyAuthContext } from "./spotify-client-provider";

export default function SpotifyAuthButton() {
  const context = React.use(SpotifyAuthContext);

  const [request, , promptAsync] = context!.useSpotifyAuthRequest();

  return (
    <SpotifyBrandButton
      disabled={!request}
      style={{ margin: 16 }}
      title="Login with Spotify"
      onPress={() => promptAsync()}
    />
  );
}
