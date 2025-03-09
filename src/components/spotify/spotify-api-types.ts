// Get user's playlists
// Types for Spotify API responses
export interface SpotifyPaging<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyPlaylist {
  collaborative: boolean;
  description: string | null;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  public: boolean;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

// Types for Spotify API responses
interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  artists: SpotifyArtist[];
  external_urls: {
    spotify: string;
  };
}

export type SpotifyUserData = {
  display_name: string;
  external_urls: { spotify: string };
  followers: { href: null; total: number };
  href: string;
  id: string;
  images: { url: string; width: number; height: number }[];
  type: "user";
  /** 'spotify:user:gorillaz_' */
  uri: string;
};

export type SpotifyPlaylistData = {
  /** false */
  collaborative: boolean;
  description: string;
  external_urls: {
    /** 'https://open.spotify.com/playlist/5tPNVYsBktfRv2qjEUdrKv' */
    spotify: string;
  };
  followers: { href: null | unknown; total: 0 };
  /** 'https://api.spotify.com/v1/playlists/5tPNVYsBktfRv2qjEUdrKv?locale=*' */
  href: string;
  /** '5tPNVYsBktfRv2qjEUdrKv' */
  id: string;
  images: [
    {
      height: null | number;
      url: string;
      width: null | number;
    }
  ];
  /** 'Haloween' */
  name: string;
  owner: {
    /** 'Evan Bacon' */
    display_name: string;
    external_urls: { spotify: string };
    /** 'https://api.spotify.com/v1/users/12158865036' */
    href: string;
    /** '12158865036' */
    id: string;
    /** 'user' */
    type: string;
    /** 'spotify:user:12158865036' */
    uri: string;
  };
  primary_color: null | unknown;
  public: boolean;
  /** 'AAAAAyohsZzG5NONXah0DW8Q+VfybDFU' */
  snapshot_id: string;
  tracks: {
    href: string;
    items: {
      /** "2023-06-25T02:43:32Z" */
      added_at: string;
      added_by: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string | "user";
        uri: string;
      };
      is_local: boolean;
      primary_color: null;
      track: {
        preview_url: null;
        available_markets: string[];
        explicit: boolean;
        type: string | "track";
        episode: boolean;
        track: boolean;
        album: {
          available_markets: string[];
          type: string | "album";
          album_type: string | "single";
          /**  "https://api.spotify.com/v1/albums/2AWdSvqkBNvj9eeM48KQTJ" */
          href: string;
          /** "2AWdSvqkBNvj9eeM48KQTJ" */
          id: string;
          images: {
            /** "https://i.scdn.co/image/ab67616d0000b273c41af63dd888032c52715215" */
            url: string;
            width: number;
            height: number;
          }[];

          /** "Halloweenie IV: Innards" */
          name: string;
          /** "2021-10-22" */
          release_date: string;
          /**  "day" */
          release_date_precision: string;
          /** "spotify:album:2AWdSvqkBNvj9eeM48KQTJ" */
          uri: string;
          artists: [
            {
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              name: string;
              type: string | "artist";
              uri: string;
            }
          ];
          external_urls: {
            spotify: string;
          };
          total_tracks: number;
        };
        artists: [
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string | "artist";
            uri: string;
          }
        ];
        disc_number: number;
        track_number: number;
        duration_ms: number;
        external_ids: { isrc: string };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        popularity: number;
        uri: string;
        is_local: boolean;
      };
      video_thumbnail: { url: null };
    }[];
    limit: number;
    next: null;
    offset: number;
    previous: null;
    total: number;
  };
  type: "playlist";
  // uri: 'spotify:playlist:5tPNVYsBktfRv2qjEUdrKv'
  uri: string;
};
