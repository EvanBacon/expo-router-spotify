"use client";

import {
  AuthRequest,
  AuthRequestConfig,
  AuthRequestPromptOptions,
  AuthSessionResult,
  useAuthRequest,
} from "expo-auth-session";
import { SpotifyCodeExchangeResponse } from "./spotify-validation";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export function useSpotifyAuthRequest(
  {
    exchangeAuthCodeAsync,
  }: {
    exchangeAuthCodeAsync: (
      code: string
    ) => Promise<SpotifyCodeExchangeResponse>;
  },
  config: AuthRequestConfig
): [
  AuthRequest | null,
  AuthSessionResult | null,
  (
    options?: AuthRequestPromptOptions
  ) => Promise<SpotifyCodeExchangeResponse | AuthSessionResult>
] {
  const [request, response, promptAsync] = useAuthRequest(
    {
      scopes: ["user-read-email", "playlist-modify-public"],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,

      ...config,
    },
    discovery
  );

  return [
    request,
    response,
    async (options?: AuthRequestPromptOptions) => {
      const response = await promptAsync(options);
      if (response.type === "success") {
        return exchangeAuthCodeAsync(response.params.code);
      } else {
        return response;
      }
    },
  ];
}
