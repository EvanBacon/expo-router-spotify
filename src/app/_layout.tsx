import { Stack } from "expo-router";
import { SpotifyClientAuthProvider } from "@/components/spotify/spotify-client-provider";

export default function Page() {
  return (
    <SpotifyClientAuthProvider cacheKey="spotify-access-token-1">
      <Stack />
    </SpotifyClientAuthProvider>
  );
}
