/// <reference types="react/canary" />
"use client";

import React from "react";
import { withAccessToken, type AuthResults } from "./spotify-server-api";

type AnyServerAction<TReturn = any> = (...args: any[]) => Promise<TReturn>;

// Type for the auth context
type AuthContext = {
  auth: AuthResults | null;
  getFreshAccessToken: () => Promise<AuthResults>;
};

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
          return withAccessToken.bind(null, {
            action: serverAction,
            accessToken: authContext.auth,
          })(...args);
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
