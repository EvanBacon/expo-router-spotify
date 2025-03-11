/// <reference types="react/canary" />
"use client";

import React from "react";
import { withAccessToken, type AuthResults } from "./spotify-server-api";
import type { SpotifyCodeExchangeResponse } from "@/lib/spotify-auth/spotify-validation";

type AnyServerAction<TReturn = any> = (...args: any[]) => Promise<TReturn>;

// Type for the auth context
type AuthContext = {
  auth: AuthResults | null;
  getFreshAccessToken: () => Promise<AuthResults>;
  setAccessToken: (accessToken: SpotifyCodeExchangeResponse) => void;
};
const cache = new Map<string, { result: any; timestamp: number }>();

function withCachedServerActionResults<
  T extends (...args: any[]) => Promise<any>
>(action: T, funcName: string, maxDuration: number) {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const cacheKey = `cache_${funcName}_${JSON.stringify(args)}`;

    const cacheEntry = cache.get(cacheKey);

    if (cacheEntry && Date.now() - cacheEntry.timestamp < maxDuration) {
      return cacheEntry.result;
    }

    const result = await action(...args);
    cache.set(cacheKey, { result, timestamp: Date.now() });

    return result;
  };
}

export function createSpotifyAPI<
  TActions extends Record<string, AnyServerAction>
>(serverActions: TActions) {
  // Create a new context with the transformed server actions
  const SpotifyContext = React.createContext<TActions | null>(null);

  // Create the provider component
  function SpotifyProvider({
    children,
    useAuth,
  }: {
    children: React.ReactNode;
    useAuth: () => AuthContext;
  }) {
    const authContext = useAuth();

    // Transform server actions to inject auth
    const transformedActions = React.useMemo(() => {
      const actions: Record<string, Function> = {};

      for (const [key, serverAction] of Object.entries(serverActions)) {
        actions[key] = async (...args: any[]) => {
          const authAction = withAccessToken.bind(null, {
            action: serverAction,
            accessToken: authContext.auth,
          });

          const cacheServerAction = withCachedServerActionResults(
            authAction,
            key,
            // 1 minute
            1000 * 60
          );

          const { latestToken, results } = await cacheServerAction(...args);

          if (latestToken) {
            console.log(
              "[SPOTIFY]: Access token refreshed on the server. Storing latest:",
              latestToken
            );
            authContext.setAccessToken(latestToken);
          }

          return results;
        };
      }

      return actions as TActions;
    }, [authContext]);

    return (
      <SpotifyContext.Provider value={transformedActions}>
        {children}
      </SpotifyContext.Provider>
    );
  }

  // Create a custom hook to use the context
  function useSpotify() {
    const context = React.useContext(SpotifyContext);
    if (context === null) {
      throw new Error("useSpotify must be used within a SpotifyProvider");
    }
    return context;
  }

  return {
    Provider: SpotifyProvider,
    useSpotify,
  };
}
