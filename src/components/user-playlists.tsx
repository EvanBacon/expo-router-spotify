import React from "react";
import { useSpotifyActions } from "./api";
import { UserPlaylistsSkeleton } from "./spotify/user-playlists-server";

export function UserPlaylists() {
  const actions = useSpotifyActions();

  return (
    <React.Suspense fallback={<UserPlaylistsSkeleton />}>
      {actions.getUserPlaylists({ limit: 30 })}
    </React.Suspense>
  );
}
