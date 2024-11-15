import { Stack } from "expo-router";
import {
  SpotifyClientAuthProvider,
  useSpotifyAuth,
} from "@/lib/spotify-auth/spotify-client-provider";
import { makeRedirectUri } from "expo-auth-session";
import { SpotifyActionsProvider } from "@/components/api";

import "@/global.css";

const redirectUri = makeRedirectUri({
  scheme: "exai",
});

export default function Page() {
  return (
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
  );
}

function InnerAuth() {
  return (
    <SpotifyActionsProvider useAuth={useSpotifyAuth}>
      <Stack />
    </SpotifyActionsProvider>
  );
}
