"use client";

import "@/lib/local-storage";

import React from "react";

import {
  SpotifyCodeExchangeResponse,
  SpotifyCodeExchangeResponseSchema,
  SpotifySongData,
} from "./spotify-validation";
import * as WebBrowser from "expo-web-browser";

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
  }) => Promise<SpotifySongData | null>;
  exchangeAuthCodeAsync: (props: {
    code: string;
    redirectUri: string;
  }) => Promise<any>;
} | null>(null);

export function SpotifyClientAuthProvider({
  children,
  cacheKey,
  exchangeAuthCodeAsync,
  refreshTokenAsync,
}: {
  children: React.ReactNode;
  cacheKey: string;
  exchangeAuthCodeAsync: (props: {
    code: string;
    redirectUri: string;
  }) => Promise<any>;
  refreshTokenAsync: (refreshToken: string) => Promise<{
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
  }>;
}) {
  //   const [, setMessageState] = useUIState<typeof AI>();
  //   const [aiState, setAIState] = useAIState<typeof AI>();
  //   const id = React.useId();

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

  const searchSongs = async ({ query, limit }) => {
    if (!accessObject) return null;

    const auth = await getFreshAccessToken();

    //   await sleep(2000);
    // return SONG_MOCK_DATA;
    const res = (await fetch(
      `https://api.spotify.com/v1/search?` +
        new URLSearchParams({
          q: query,
          type: "track",
          limit: limit?.toString() ?? "10",
        }),
      {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      }
    ).then((res) => res.json())) as
      | SpotifySongData
      | { error: { status: number; message: string } };

    console.log("FETCHED SONGS:", res);
    // { error: { status: 401, message: 'The access token expired' } }

    if ("error" in res) {
      const err = new Error(res.error.message);
      err.statusCode = res.error.status;
      throw err;
    }
    //   res.tracks.items = res.tracks.items.map(({ available_markets, ...track }) => track);
    return res;
  };

  //   React.useEffect(() => {
  //     if (accessObject.access_token) {
  //       // console.log('>>>', aiState);
  //       // Insert a new message into the AI state.
  //       const info = {
  //         role: 'assistant' as const,
  //         name: 'spotify_access_token',
  //         content: accessObject.access_token,

  //         // Identifier of this UI component, so we don't insert it many times.
  //         id,
  //       };
  //       console.log(info);

  //       setMessageState((messages) => [
  //         ...messages.filter((message) => message.id !== id),
  //         {
  //           id,
  //           display: <AssistantMessage>{`[Authorize with Spotify]`}</AssistantMessage>,
  //         },
  //       ]);

  //       setAIState((aiState) => {
  //         return [...aiState.filter((item) => item.id !== id), info];
  //       });
  //     } else {
  //       setMessageState((messages) => [...messages.filter((message) => message.id !== id)]);

  //       setAIState((aiState) => aiState.filter((item) => item.id !== id));
  //     }
  //   }, [accessObject?.access_token]);

  return (
    <SpotifyAuthContext
      value={{
        exchangeAuthCodeAsync: async (props) => {
          const res = await exchangeAuthCodeAsync(props);
          storeAccessToken(res);
          return res;
        },
        searchSongs,

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
