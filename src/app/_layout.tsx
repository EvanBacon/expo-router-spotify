import "server-only";

import { Slot } from "expo-router";
import { SpotifyAuthProvider } from "@/components/spotify/spotify-provider";

export default function Page() {
  return (
    <SpotifyAuthProvider cacheKey="spotify-access-token-1">
      <Slot />
    </SpotifyAuthProvider>
  );
}
