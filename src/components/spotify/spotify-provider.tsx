import React from "react";
import { SpotifyClientAuthProvider } from "./spotify-client-provider";

import {
  SpotifyCodeExchangeResponse,
  SpotifyCodeExchangeResponseSchema,
} from "./spotify-validation";
export { SpotifyAuthContext } from "./spotify-client-provider";

export {
  SpotifySongData,
  SpotifyCodeExchangeResponse,
} from "./spotify-validation";

async function exchangeAuthCodeAsync(props: {
  code: string;
  redirectUri: string;
}): Promise<SpotifyCodeExchangeResponse> {
  "use server";

  const body = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      code: props.code,
      redirect_uri: props.redirectUri,
      grant_type: "authorization_code",
    }).toString(),
  }).then((res) => res.json());

  console.log("[SPOTIFY] requestAccessToken:", body);
  const response = SpotifyCodeExchangeResponseSchema.parse(body);
  if ("expires_in" in response) {
    // Set the expiration time to the current time plus the number of seconds until it expires.
    response.expires_in = Date.now() + response.expires_in * 1000;
  }

  return response;
}

async function refreshTokenAsync(
  refreshToken: string
): Promise<SpotifyCodeExchangeResponse> {
  "use server";

  const body = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
    }),
  }).then((res) => res.json());

  console.log("[SPOTIFY] refreshToken:", body);
  const response = SpotifyCodeExchangeResponseSchema.parse(body);
  if ("expires_in" in response) {
    // Set the expiration time to the current time plus the number of seconds until it expires.
    response.expires_in = Date.now() + response.expires_in * 1000;
  }
  response.refresh_token ??= refreshToken;

  return response;
}

export function SpotifyAuthProvider({
  children,
  cacheKey,
}: {
  children: React.ReactNode;
  cacheKey: string;
}) {
  return (
    <SpotifyClientAuthProvider
      exchangeAuthCodeAsync={exchangeAuthCodeAsync}
      refreshTokenAsync={refreshTokenAsync}
      cacheKey={cacheKey}
    >
      {children}
    </SpotifyClientAuthProvider>
  );
}
