import { Stack } from "expo-router";
import { SpotifyClientAuthProvider } from "@/components/spotify/spotify-client-provider";
import { SpotifyActionsProvider } from "@/components/spotify/spotify-actions";

export default function Page() {
  return (
    <SpotifyClientAuthProvider cacheKey="spotify-access-token-1">
      <SpotifyActionsProvider>
        <Stack />
      </SpotifyActionsProvider>
    </SpotifyClientAuthProvider>
  );
}
