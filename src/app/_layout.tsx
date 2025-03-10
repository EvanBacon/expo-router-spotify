import Stack from "@/components/ui/Stack";
import {
  SpotifyClientAuthProvider,
  useSpotifyAuth,
} from "@/lib/spotify-auth/spotify-client-provider";
import { makeRedirectUri } from "expo-auth-session";
import { SpotifyActionsProvider } from "@/components/api";

import "@/global.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Modal } from "react-native";
import SignInRoute from "@/components/sign-in";

const redirectUri = makeRedirectUri({
  scheme: "exai",
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

function AuthStack() {
  const spotifyAuth = useSpotifyAuth();

  return (
    <>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>

      {/* Handle authentication outside of Expo Router to allow async animations and global handling. */}
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="pageSheet"
        visible={!spotifyAuth.accessToken}
      >
        <SignInRoute />
      </Modal>
    </>
  );
}
