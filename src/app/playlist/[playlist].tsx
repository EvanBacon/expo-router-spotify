import { useSpotifyActions } from "@/components/api";
import Playlist from "@/components/spotify/playlist-info";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";

export { ErrorBoundary } from "expo-router";

export default function PlaylistScreen() {
  const { playlist } = useLocalSearchParams<{ playlist: string }>();

  const actions = useSpotifyActions();

  return (
    <Suspense fallback={<Playlist data={{ name: "..." }} />}>
      {actions.renderPlaylistAsync({ playlistId: playlist })}
    </Suspense>
  );
}
