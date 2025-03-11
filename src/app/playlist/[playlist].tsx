import { useSpotifyActions } from "@/components/api";
import Playlist from "@/components/playlist-info";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";

export { SpotifyErrorBoundary as ErrorBoundary } from "@/components/spotify-error-boundary";

export default function PlaylistScreen() {
  const { playlist } = useLocalSearchParams<{ playlist: string }>();
  const { renderPlaylistAsync } = useSpotifyActions();

  return (
    <Suspense fallback={<PlaylistSkeleton />}>
      {renderPlaylistAsync({ playlistId: playlist })}
    </Suspense>
  );
}

function PlaylistSkeleton() {
  return (
    <Playlist
      isLoading
      user={
        {
          display_name: "Evan Bacon",
          followers: {
            total: "???",
          },
          images: [
            {
              url: "",
              height: 300,
              width: 300,
            },
          ],
        } as any
      }
      data={
        {
          description: "",
          images: [
            {
              url: "",
            },
          ],
          name: "Girly Pop 💕",
          owner: {
            display_name: "Evan Bacon",
            external_urls: {
              spotify: "#",
            },
          },
          tracks: {
            href: "#",
            items: [
              {
                track: {
                  album: {
                    images: [
                      {
                        url: "",
                      },
                    ],
                  },
                  artists: [
                    {
                      name: "No Doubt",
                    },
                  ],

                  id: "a",
                  name: "Just A Girl",
                },
              },

              {
                track: {
                  album: {
                    images: [
                      {
                        url: "",
                      },
                    ],
                  },
                  artists: [
                    {
                      name: "Katy Perry",
                    },
                    {
                      name: "Kanye West",
                    },
                  ],
                  id: "b",
                  name: "E.T.",
                },
              },
              {
                track: {
                  album: {
                    images: [
                      {
                        url: "",
                      },
                    ],
                  },
                  artists: [
                    {
                      name: "Yeah Yeah Yeahs",
                    },
                  ],
                  id: "c",
                  name: "Heads Will Roll",
                },
              },

              {
                track: {
                  album: {
                    images: [
                      {
                        url: "",
                      },
                    ],
                  },
                  artists: [
                    {
                      name: "No Doubt",
                    },
                  ],

                  id: "x",
                  name: "Just A Girl",
                },
              },

              {
                track: {
                  album: {
                    images: [
                      {
                        url: "",
                      },
                    ],
                  },
                  artists: [
                    {
                      name: "Katy Perry",
                    },
                    {
                      name: "Kanye West",
                    },
                  ],
                  id: "y",
                  name: "E.T.",
                },
              },
              {
                track: {
                  album: {
                    images: [
                      {
                        url: "",
                      },
                    ],
                  },
                  artists: [
                    {
                      name: "Yeah Yeah Yeahs",
                    },
                  ],
                  id: "z",
                  name: "Heads Will Roll",
                },
              },
            ],
          },
        } as any
      }
    />
  );
}
