/// <reference types="react/canary" />
"use client";

import React from "react";

import { renderSongsAsync } from "./spotify-server-actions";
import { useSpotifyAuth } from "@/lib/spotify-auth";

export const SpotifyActionsContext = React.createContext<{
  renderSongsAsync: (props: {
    query: string;
    limit?: number;
  }) => Promise<React.ReactElement | null>;
} | null>(null);

export function SpotifyActionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useSpotifyAuth();

  return (
    <SpotifyActionsContext.Provider
      value={{
        async renderSongsAsync({
          query,
          limit,
        }: {
          query: string;
          limit?: number;
        }) {
          if (!authContext.auth) {
            return null;
          }
          return renderSongsAsync(await authContext.getFreshAccessToken(), {
            query,
            limit,
          });
        },
      }}
    >
      {children}
    </SpotifyActionsContext.Provider>
  );
}
