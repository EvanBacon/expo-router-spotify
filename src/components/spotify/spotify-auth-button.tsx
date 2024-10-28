"use client";

import * as React from "react";

import {
  AuthSessionResult,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { SpotifyBrandButton } from "./spotify-brand-button";
import { SpotifyAuthContext } from "./spotify-client-provider";
import * as Linking from "expo-linking";

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
      spotifyAuth
        ?.exchangeAuthCodeAsync({
          code: response.params.code,
          redirectUri,
        })
        .then((response) => {
          console.log("Exchange complete");
          if (IS_AUTH_PROXY) {
            Linking.openURL(
              new URLSearchParams(window.location.href).get("redirect") +
                "?access_token=" +
                response.access_token
            );
            // Linking.openURL("");
          }
        });
    }
  }, []);
}

const IS_AUTH_PROXY =
  process.env.EXPO_OS === "web" &&
  typeof window !== "undefined" &&
  window.location.search.includes("_auth_proxy=1");

export default function SpotifyAuthButton() {
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

  // React.useEffect(() => {
  //   if (IS_AUTH_PROXY && request) {
  //     promptAsync();
  //   }
  // }, [request, promptAsync]);

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

export function SpotifyProxyButton() {
  return (
    <SpotifyBrandButton
      style={{ margin: 16 }}
      title="Login with Spotify"
      onPress={async () => {
        console.log(
          "NATIVE RESULTS:",
          await WebBrowser.openAuthSessionAsync(
            new URL(
              "/?_auth_proxy=1&redirect=" + Linking.createURL("/"),
              "http://localhost:8081"
            ).toString()
            // new URL("/", window.location.href).toString()
          )
        );
      }}
    />
  );
}
import * as WebBrowser from "expo-web-browser";
