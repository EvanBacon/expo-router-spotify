"use client";

import type { SpotifyPaging, SpotifyPlaylist } from "./spotify-server-actions";

import * as Form from "@/components/ui/Form";
import { Image, View } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function UserPlaylistsServer({
  data,
}: {
  data: SpotifyPaging<SpotifyPlaylist>;
}) {
  return (
    <>
      <Form.List navigationTitle="Playlists">
        <Form.Section>
          {data.items
            .filter((playlist) => {
              return playlist.tracks.total > 0;
            })
            .map((playlist) => {
              // Get the best quality image, or use placeholder if no images
              const imageUrl = playlist.images?.[0]?.url ?? "/placeholder.png";

              return (
                <Form.Link
                  key={playlist.id}
                  href={`/playlist/${playlist.id}`}
                  style={{ flexWrap: "wrap", flexDirection: "row", gap: 16 }}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      aspectRatio: 1,
                      height: 64,
                      borderRadius: 8,
                      backgroundColor: AC.systemGray3,
                    }}
                  />
                  <View
                    style={{
                      flexShrink: 1,
                    }}
                  >
                    <Form.Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                      }}
                    >
                      {playlist.name}
                    </Form.Text>
                    <Form.Text style={{ fontSize: 14 }}>
                      {playlist.tracks.total} tracks
                    </Form.Text>
                    {playlist.description && (
                      <Form.Text style={{ fontSize: 14 }}>
                        {playlist.description}
                      </Form.Text>
                    )}
                  </View>
                </Form.Link>
              );
            })}
        </Form.Section>
      </Form.List>
    </>
  );
}
// "use dom";

// import { Link } from "expo-router";
// import type { SpotifyPaging, SpotifyPlaylist } from "./spotify-server-actions";

// import "@/global.css";

// export default function UserPlaylistsServer({
//   data,
// }: {
//   data: SpotifyPaging<SpotifyPlaylist>;
//   dom?: import("expo/dom").DOMProps;
// }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {data.items.map((playlist) => {
//         // Get the best quality image, or use placeholder if no images
//         const imageUrl = playlist.images?.[0]?.url ?? "/placeholder.png";

//         return (
//           <Link href={`/playlist/${playlist.id}`}>
//             <div
//               key={playlist.id}
//               className="p-4 border rounded-lg hover:shadow-md transition-shadow"
//             >
//               <img
//                 src={imageUrl}
//                 alt={`${playlist.name} playlist cover`}
//                 className="w-full aspect-square object-cover rounded-md bg-gray-100"
//               />
//               <h3 className="font-semibold mt-2 truncate" title={playlist.name}>
//                 {playlist.name}
//               </h3>
//               <p className="text-sm text-gray-600 flex items-center justify-between">
//                 <span>{playlist.tracks.total} tracks</span>
//                 <span className="text-xs">
//                   {playlist.public ? "Public" : "Private"}
//                 </span>
//               </p>
//               {playlist.description && (
//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {playlist.description}
//                 </p>
//               )}
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }
