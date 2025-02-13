import { z } from "zod";

export const SpotifyCodeExchangeResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional(),
  scope: z.string(),
});

export type SpotifyCodeExchangeResponse = z.infer<
  typeof SpotifyCodeExchangeResponseSchema
>;

type PaginatedData<T> = {
  href: string;
  items: T[];

  limit: number;
  /** "https://api.spotify.com/v1/search?query=Ashnikko&type=track&locale=*&offset=15&limit=15" */
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SpotifySongData = {
  tracks: PaginatedData<{
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets?: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  }>;

  artists: PaginatedData<{
    external_urls: {
      /** "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4" */
      spotify: string;
    };
    followers: { href: null; total: number };
    /** ["rap", "hip hop"] */
    genres: string[];
    /** "https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4" */
    href: string;
    /** "3TVXtAsR1Inumwj472S9r4" */
    id: string;
    images: { url: string; width: number; height: number }[];
    /** "Drake" */
    name: string;
    /** 94 */
    popularity: number;
    type: "artist";
    /** "spotify:artist:3TVXtAsR1Inumwj472S9r4" */
    uri: string;
  }>;

  albums: PaginatedData<{
    album_type: "album";
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    /** "https://api.spotify.com/v1/albums/6jlrjFR9mJV3jd1IPSplXU" */
    href: string;
    /** "6jlrjFR9mJV3jd1IPSplXU" */
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    /** "Thank Me Later" */
    name: string;
    /** "2010-01-01" */
    release_date: string;
    /** "day" */
    release_date_precision: "day" | (string & {});
    type: "album";
    /** "spotify:album:6jlrjFR9mJV3jd1IPSplXU" */
    uri: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      /** "Drake" */
      name: string;
      type: "artist";
      /** "spotify:artist:3TVXtAsR1Inumwj472S9r4" */
      uri: string;
    }[];
  }>;
};
