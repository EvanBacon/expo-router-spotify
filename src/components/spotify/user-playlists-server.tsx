"use dom";

import { Link } from "expo-router";
import type { SpotifyPaging, SpotifyPlaylist } from "./spotify-server-actions";

import "@/global.css";

export default function UserPlaylistsServer({
  data,
}: {
  data: SpotifyPaging<SpotifyPlaylist>;
  dom?: import("expo/dom").DOMProps;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.items.map((playlist) => {
        // Get the best quality image, or use placeholder if no images
        const imageUrl = playlist.images?.[0]?.url ?? "/placeholder.png";

        return (
          <Link href={`/playlist/${playlist.id}`}>
            <div
              key={playlist.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <img
                src={imageUrl}
                alt={`${playlist.name} playlist cover`}
                className="w-full aspect-square object-cover rounded-md bg-gray-100"
              />
              <h3 className="font-semibold mt-2 truncate" title={playlist.name}>
                {playlist.name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center justify-between">
                <span>{playlist.tracks.total} tracks</span>
                <span className="text-xs">
                  {playlist.public ? "Public" : "Private"}
                </span>
              </p>
              {playlist.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {playlist.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
