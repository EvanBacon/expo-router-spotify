import { Suspense } from "react";
import { useSpotifyActions } from "./api";
import { UserPlaylistsSkeleton } from "@/components/user-playlists-server";

export function UserPlaylists() {
  const { getUserPlaylists } = useSpotifyActions();

  return (
    <Suspense fallback={<UserPlaylistsSkeleton />}>
      {getUserPlaylists({ limit: 30 })}
    </Suspense>
  );
}
