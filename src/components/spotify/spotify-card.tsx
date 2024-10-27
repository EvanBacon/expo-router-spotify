/////
import "server-only";

import * as React from "react";

import SpotifyCardInner from "./spotify-card-inner";
import { Card } from "@/components/card";

export default function SpotifyCard({ query }: { query: string }) {
  return (
    <Card title={"Spotify: " + query} style={{ padding: 0 }}>
      <SpotifyCardInner query={query} />
    </Card>
  );
}
