/// <reference types="react/canary" />
"use client";

import React from "react";
import { withAccessToken, type AuthResults } from "./bind-action";

type AnyServerAction<TReturn = any> = (...args: any[]) => Promise<TReturn>;

// Helper type to extract the parameters excluding the first one (auth)
type ExcludeFirstParameter<T extends AnyServerAction> = T extends (
  first: any,
  ...rest: infer R
) => any
  ? (...args: R) => ReturnType<T>
  : never;

// Helper type to transform all server actions to client actions
type TransformServerActions<T extends Record<string, AnyServerAction>> = {
  [K in keyof T]: ExcludeFirstParameter<T[K]>;
};

// Type for the auth context
type AuthContext = {
  auth: AuthResults | null;
  getFreshAccessToken: () => Promise<AuthResults>;
};

export function createSpotifyAPI<T extends Record<string, AnyServerAction>>(
  serverActions: T
) {
  // Create a new context with the transformed server actions
  const SpotifyContext = React.createContext<TransformServerActions<T> | null>(
    null
  );

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

      return actions as TransformServerActions<T>;
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
