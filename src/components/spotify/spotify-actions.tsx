/// <reference types="react/canary" />
"use client";

import React from "react";

// Helper type to extract the parameters excluding the first one (auth)
type ExcludeFirstParameter<T extends (...args: any[]) => any> = T extends (
  first: any,
  ...rest: infer R
) => any
  ? (...args: R) => ReturnType<T>
  : never;

// Helper type to transform all server actions to client actions
type TransformServerActions<T extends Record<string, Function>> = {
  [K in keyof T]: ExcludeFirstParameter<T[K]>;
};

// Type for the auth context
type AuthContext = {
  auth: { accessToken: string } | null;
  getFreshAccessToken: () => Promise<{ access_token: string }>;
};

export function createSpotifyAPI<
  T extends Record<
    string,
    (auth: { access_token: string }, ...args: any[]) => any
  >
>(serverActions: T) {
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
          if (!authContext.auth) {
            return null;
          }
          return serverAction(await authContext.getFreshAccessToken(), ...args);
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
