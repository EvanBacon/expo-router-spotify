/////
import "server-only";

import * as React from "react";

import SpotifyCardInner from "./spotify-card-inner";
import { Card } from "@/components/card";

export default function SpotifyCard({
  query,
  accessToken,
}: {
  query: string;
  accessToken?: string;
}) {
  if (accessToken) {
    return (
      <Card title={"Spotify: " + query} style={{ padding: 0 }}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            gap: 8,
            padding: 16,
          }}
        >
          <React.Suspense
            fallback={
              <>
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
              </>
            }
          >
            <DoRender query={query} accessToken={accessToken} />
          </React.Suspense>
        </ScrollView>
        {/* <SpotifyBrandButton
          title="Logout"
          style={{ marginHorizontal: 16 }}
          onPress={() => {
            spotifyAuth.clearAccessToken();
          }}
        /> */}
      </Card>
    );
  }

  return (
    <Card title={"Spotify: " + query} style={{ padding: 0 }}>
      <SpotifyCardInner query={query} />
    </Card>
  );
}

import { ScrollView } from "react-native";
import { SongItem, SongItemSkeleton } from "./songs";

async function DoRender({
  query,
  accessToken,
}: {
  query: string;
  accessToken: string;
}) {
  const data = await fetch(
    `https://api.spotify.com/v1/search?` +
      new URLSearchParams({
        q: query,
        type: "track",
        limit: String(15),
      }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());

  return (
    <>
      {data.tracks.items.map((track: any) => (
        <SongItem
          href={track.external_urls.spotify}
          key={track.id}
          image={track.album.images[0].url}
          title={track.name}
          artist={track.artists.map((artist) => artist.name).join(", ")}
        />
      ))}
    </>
  );
}
