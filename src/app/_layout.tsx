import Stack from "@/components/ui/Stack";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import {
  SpotifyClientAuthProvider,
  useSpotifyAuth,
} from "@/lib/spotify-auth/spotify-client-provider";
import { makeRedirectUri } from "expo-auth-session";
import { SpotifyActionsProvider } from "@/components/api";

import "@/global.css";
import ThemeProvider from "@/components/ui/ThemeProvider";

import { Modal } from "@/components/modal";
import SignInRoute from "@/components/sign-in";
import React, { useEffect } from "react";
import { router, useGlobalSearchParams, usePathname } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const redirectUri = makeRedirectUri({
  scheme: "exspotify",
});

export default function Page() {
  return (
    <ThemeProvider>
      <SpotifyClientAuthProvider
        config={{
          clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
          scopes: [
            "user-read-email",
            "user-read-private",
            "playlist-read-private",
            "playlist-modify-public",
            "user-top-read",
          ],
          redirectUri,
        }}
      >
        <InnerAuth />
      </SpotifyClientAuthProvider>
    </ThemeProvider>
  );
}

function InnerAuth() {
  return (
    <SpotifyActionsProvider useAuth={useSpotifyAuth}>
      <AuthStack />
    </SpotifyActionsProvider>
  );
}

function WebHeader(props: NativeStackHeaderProps) {
  const spotifyAuth = useSpotifyAuth();
  const pathname = usePathname();
  const { query: text } = useGlobalSearchParams<{ query: string }>();
  const ref = React.useRef<HTMLInputElement>(null);

  const isOnSearchRoute = pathname.startsWith("/search");
  useEffect(() => {
    if (ref.current && text) {
      ref.current.value = text;
    }
  }, [ref]);

  useEffect(() => {
    if (isOnSearchRoute) {
      ref.current?.focus();
    }
  }, [isOnSearchRoute]);

  // TODO: Unclear how React Navigation expects you to get the title and other properties.
  return (
    <header className="fixed top-0 left-0 right-0 bg-opacity-70 backdrop-blur-md text-white px-4 py-2 shadow-md dark:bg-black dark:bg-opacity-70">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <a
            href="/"
            className="hover:bg-gray-200 hover:bg-opacity-10 transition duration-200 p-2 rounded"
          >
            <h1 className="text-xl font-bold">
              {props.options.title ?? "Expo Spotify"}
            </h1>
          </a>
        </div>
        <nav className="flex space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                ref={ref}
                className="px-4 py-1 pl-10 rounded-md border border-slate-600 bg-[#27272a] text-white focus:outline-none focus:ring-2 focus:ring-white"
                onChange={(e) => {
                  if (!isOnSearchRoute) {
                    router.replace(`/search/${e.target.value}`);
                  } else {
                    router.setParams({ query: e.target.value });
                  }
                }}
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <ul className="flex space-x-2">
            <li className="flex">
              <a
                target="_blank"
                href="https://github.com/evanbacon/expo-router-spotify"
                className="hover:bg-gray-200 hover:bg-opacity-20 transition duration-200 p-2 rounded"
              >
                Source
              </a>
            </li>
            <li className="flex">
              <button
                onClick={() => {
                  // Add your logout logic here
                  spotifyAuth.clearAccessToken();
                }}
                className="hover:bg-gray-200 hover:bg-opacity-20 transition duration-200 p-2 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function AuthStack() {
  const spotifyAuth = useSpotifyAuth();

  return (
    <>
      <Stack
        screenOptions={{
          header:
            process.env.EXPO_OS !== "web"
              ? undefined
              : (props: NativeStackHeaderProps) => {
                  // TODO: Unclear how React Navigation expects you to get the title and other properties.
                  return <WebHeader {...props} />;
                },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="playlist/[playlist]"
          options={{
            headerBackButtonDisplayMode: "default",
            title: process.env.EXPO_OS === "web" ? undefined : "",
          }}
        />
      </Stack>

      {/* Handle authentication outside of Expo Router to allow async animations and global handling. */}
      <Modal visible={!spotifyAuth.accessToken}>
        <SignInRoute />
      </Modal>
    </>
  );
}
