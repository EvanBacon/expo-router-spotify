"use client";

import "@/lib/local-storage";

import React from "react";

import {
  SpotifyCodeExchangeResponse,
  SpotifyCodeExchangeResponseSchema,
} from "./spotify-validation";
import * as WebBrowser from "expo-web-browser";
import {
  exchangeAuthCodeAsync,
  refreshTokenAsync,
} from "./auth-server-actions";

WebBrowser.maybeCompleteAuthSession();

export const SpotifyAuthContext = React.createContext<{
  accessToken: string | null;
  auth: SpotifyCodeExchangeResponse | null;
  setAccessToken: (access: SpotifyCodeExchangeResponse) => void;
  clearAccessToken: () => void;
  getFreshAccessToken: () => Promise<SpotifyCodeExchangeResponse>;
  exchangeAuthCodeAsync: (props: {
    code: string;
    redirectUri: string;
  }) => Promise<any>;
} | null>(null);

export function SpotifyClientAuthProvider({
  children,
  cacheKey = "spotify-access-token",
}: {
  children: React.ReactNode;
  cacheKey?: string;
}) {
  const [accessObjectString, setAccessToken] = React.useState<string | null>(
    localStorage.getItem(cacheKey)
  );

  const accessObject = React.useMemo(() => {
    if (!accessObjectString) {
      return null;
    }
    try {
      const obj = JSON.parse(accessObjectString);
      return SpotifyCodeExchangeResponseSchema.parse(obj);
    } catch (error) {
      console.error("Failed to parse Spotify access token", error);
      localStorage.removeItem(cacheKey);
      return null;
    }
  }, [accessObjectString]);

  const storeAccessToken = (token: SpotifyCodeExchangeResponse) => {
    const str = JSON.stringify(token);
    setAccessToken(str);
    localStorage.setItem(cacheKey, str);
  };

  return (
    <SpotifyAuthContext.Provider
      value={{
        async exchangeAuthCodeAsync(props) {
          const res = await exchangeAuthCodeAsync(props);
          storeAccessToken(res);
          return res;
        },
        async getFreshAccessToken() {
          if (!accessObject) {
            throw new Error("Cannot refresh token without an access object");
          }
          if (accessObject.expires_in >= Date.now()) {
            console.log(
              "[SPOTIFY]: Token still valid. Refreshing in: ",
              accessObject.expires_in - Date.now()
            );
            return accessObject;
          }
          if (!accessObject.refresh_token) {
            throw new Error(
              "Cannot refresh access because the access object does not contain a refresh token"
            );
          }

          console.log(
            "[SPOTIFY]: Token expired. Refreshing:",
            accessObject.refresh_token
          );
          const nextAccessObject = await refreshTokenAsync(
            accessObject.refresh_token
          );
          storeAccessToken(nextAccessObject);
          return nextAccessObject;
        },
        accessToken: accessObject?.access_token ?? null,
        auth: accessObject ?? null,
        setAccessToken: storeAccessToken,
        clearAccessToken() {
          setAccessToken(null);
          localStorage.removeItem(cacheKey);
        },
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
}
