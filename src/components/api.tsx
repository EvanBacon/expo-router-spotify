"use client";

import { createSpotifyAPI } from "@/components/spotify/create-spotify-client-api";
import * as serverActions from "@/components/spotify/spotify-server-actions";

const api = createSpotifyAPI(serverActions);

// Wrapping to ensure the auth context is available on the server without needing to manually pass to each function.
export const {
  Provider: SpotifyActionsProvider,
  useSpotify: useSpotifyActions,
} = api;
