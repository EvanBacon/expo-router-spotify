import { useSpotifyActions } from "@/components/api";
import { BodyScrollView } from "@/components/ui/body";
import { Stack, useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { Button, Text, View } from "react-native";

export { ErrorBoundary } from "expo-router";

export default function PlaylistScreen() {
  const { playlist } = useLocalSearchParams<{ playlist: string }>();

  const actions = useSpotifyActions();

  return (
    <>
      <BodyScrollView>
        <Suspense fallback={<Text>Loading...</Text>}>
          {actions.renderPlaylistAsync({ playlistId: playlist })}
        </Suspense>
      </BodyScrollView>
    </>
  );
}
