/// <reference types="react/canary" />
"use client";

import React, { use } from "react";

import { renderSongsAsync } from "./spotify-server-actions";
import { SpotifyAuthContext } from "./spotify-client-provider";

export const SpotifyActionsContext = React.createContext<{
  renderSongsAsync: (props: {
    query: string;
    limit?: number;
  }) => Promise<React.ReactElement>;
} | null>(null);

export function SpotifyActionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = use(SpotifyAuthContext);

  return (
    <SpotifyActionsContext.Provider
      value={{
        async renderSongsAsync({
          query,
          limit,
        }: {
          query: string;
          limit: number;
        }) {
          if (!authContext?.auth) {
            return null;
          }

          const auth = await authContext.getFreshAccessToken();

          if (!auth) {
            return null;
          }

          return renderSongsAsync(auth, { query, limit });
        },
      }}
    >
      {children}
    </SpotifyActionsContext.Provider>
  );
}
