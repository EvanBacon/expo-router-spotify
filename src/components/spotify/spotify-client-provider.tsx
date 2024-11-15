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

import { renderSongsAsync } from "./spotify-server-actions";

WebBrowser.maybeCompleteAuthSession();

export const SpotifyAuthContext = React.createContext<{
  accessToken: string | null;
  auth: SpotifyCodeExchangeResponse | null;
  setAccessToken: (access: SpotifyCodeExchangeResponse) => void;
  clearAccessToken: () => void;
  getFreshAccessToken: () => Promise<SpotifyCodeExchangeResponse>;
  searchSongs: (props: {
    query: string;
    limit?: number;
  }) => Promise<React.ReactElement>;
  exchangeAuthCodeAsync: (props: {
    code: string;
    redirectUri: string;
  }) => Promise<any>;
} | null>(null);

export function SpotifyClientAuthProvider({
  children,
  cacheKey,
}: {
  children: React.ReactNode;
  cacheKey: string;
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

  const clearAccessToken = () => {
    setAccessToken(null);
    localStorage.removeItem(cacheKey);
  };

  const storeAccessToken = (token: SpotifyCodeExchangeResponse) => {
    const str = JSON.stringify(token);
    setAccessToken(str);
    localStorage.setItem(cacheKey, str);
  };

  const getFreshAccessToken = async () => {
    if (!accessObject) return null;
    if (accessObject.expires_in >= Date.now()) {
      console.log(
        "[SPOTIFY]: Token still valid. Refreshing in: ",
        accessObject.expires_in - Date.now()
      );
      return accessObject;
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
  };

  const renderSongsWithAuthAsync = async ({
    query,
    limit,
  }: {
    query: string;
    limit: number;
  }) => {
    if (!accessObject) {
      return null;
    }

    const auth = await getFreshAccessToken();

    if (!auth) {
      return null;
    }

    return renderSongsAsync(auth, { query, limit });
  };

  return (
    <SpotifyAuthContext
      value={{
        exchangeAuthCodeAsync: async (props) => {
          const res = await exchangeAuthCodeAsync(props);
          storeAccessToken(res);
          return res;
        },
        searchSongs: renderSongsWithAuthAsync,

        getFreshAccessToken,
        accessToken: accessObject?.access_token ?? null,
        auth: accessObject ?? null,
        setAccessToken: storeAccessToken,
        clearAccessToken,
      }}
    >
      {children}
    </SpotifyAuthContext>
  );
}
