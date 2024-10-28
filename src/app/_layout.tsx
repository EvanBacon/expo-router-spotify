import "server-only";

import { Slot } from "expo-router";
import { SpotifyClientAuthProvider } from "@/components/spotify/spotify-client-provider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView>
      <SpotifyClientAuthProvider cacheKey="spotify-access-token-1">
        <Slot />
      </SpotifyClientAuthProvider>
    </SafeAreaView>
  );
}
