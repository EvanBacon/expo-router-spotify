"use server";

import React from "react";

import { SongItem } from "./songs";
import type { SpotifySongData } from "@/lib/spotify-auth";

export const renderSongsAsync = async (
  auth: { access_token: string },
  { query, limit }: { query: string; limit?: number }
) => {
  const res = (await fetch(
    `https://api.spotify.com/v1/search?` +
      new URLSearchParams({
        q: query,
        type: "track",
        limit: limit?.toString() ?? "10",
      }),
    {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  ).then((res) => res.json())) as
    | SpotifySongData
    | { error: { status: number; message: string } };

  console.log("FETCHED SONGS:", res);
  // { error: { status: 401, message: 'The access token expired' } }

  if ("error" in res) {
    const err = new Error(res.error.message);
    // @ts-expect-error
    err.statusCode = res.error.status;
    throw err;
  }

  return (
    <>
      {res.tracks.items.map((track) => (
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
};
