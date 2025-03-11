"use server";

import "server-only";

import {
  SpotifyCodeExchangeResponse,
  SpotifyCodeExchangeResponseSchema,
} from "./spotify-validation";

const {
  EXPO_PUBLIC_SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
} = process.env;

const authorization =
  "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");

async function makeTokenCallAsync(searchParams: URLSearchParams) {
  const body = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: authorization,
    },
    body: searchParams,
  }).then((res) => res.json());
  console.log("[SPOTIFY] token:", body);

  const response = SpotifyCodeExchangeResponseSchema.parse(body);
  if ("expires_in" in response) {
    // Set the expiration time to the current time plus the number of seconds until it expires.
    response.expires_in = Date.now() + response.expires_in * 1000;
  }
  return response;
}

export async function exchangeAuthCodeAsync(props: {
  code: string;
  redirectUri: string;
}): Promise<SpotifyCodeExchangeResponse> {
  return await makeTokenCallAsync(
    new URLSearchParams({
      grant_type: "authorization_code",
      code: props.code,
      redirect_uri: props.redirectUri,
    })
  );
}

export async function refreshTokenAsync(
  refreshToken: string
): Promise<SpotifyCodeExchangeResponse> {
  const response = await makeTokenCallAsync(
    new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId!,
      refresh_token: refreshToken,
    })
  );
  response.refresh_token ??= refreshToken;

  return response;
}
