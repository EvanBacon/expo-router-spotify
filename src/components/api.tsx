"use client";

import { createSpotifyAPI } from "@/components/spotify/spotify-actions";
import * as serverActions from "@/components/spotify/spotify-server-actions";

// Wrapping to ensure the auth context is available on the server without needing to manually pass to each function.
export const {
  Provider: SpotifyActionsProvider,
  useSpotify: useSpotifyActions,
} = createSpotifyAPI(serverActions);
