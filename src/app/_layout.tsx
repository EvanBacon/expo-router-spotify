import { Stack } from "expo-router";
import { SpotifyClientAuthProvider } from "@/lib/spotify-auth/spotify-client-provider";
import { SpotifyActionsProvider } from "@/components/spotify/spotify-actions";
import { makeRedirectUri } from "expo-auth-session";

const redirectUri = makeRedirectUri({
  scheme: "exai",
});

export default function Page() {
  return (
    <SpotifyClientAuthProvider
      config={{
        clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
        scopes: ["user-read-email", "playlist-modify-public"],
        redirectUri,
      }}
      cacheKey="spotify-access-token-1"
    >
      <SpotifyActionsProvider>
        <Stack />
      </SpotifyActionsProvider>
    </SpotifyClientAuthProvider>
  );
}
