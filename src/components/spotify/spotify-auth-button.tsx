"use client";

import * as React from "react";

import {
  AuthSessionResult,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { SpotifyBrandButton } from "./spotify-brand-button";
import { SpotifyAuthContext } from "./spotify-client-provider";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const redirectUri = makeRedirectUri({
  scheme: "exai",
});

function useExchangeCallback() {
  const spotifyAuth = React.use(SpotifyAuthContext);

  return React.useCallback((response: AuthSessionResult) => {
    if (response?.type === "success") {
      spotifyAuth?.exchangeAuthCodeAsync({
        code: response.params.code,
        redirectUri,
      });
    }
  }, []);
}

export default function SpotifyCard() {
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
      scopes: ["user-read-email", "playlist-modify-public"],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri,
    },
    discovery
  );

  const exchange = useExchangeCallback();

  return (
    <SpotifyBrandButton
      disabled={!request}
      style={{ margin: 16 }}
      title="Login with Spotify"
      onPress={() => {
        promptAsync().then(exchange);
      }}
    />
  );
}
