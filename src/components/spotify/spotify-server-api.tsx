"use server";

import { refreshTokenAsync } from "@/lib/spotify-auth/auth-server-actions";

export type AuthResults = {
  access_token: string;
  token_type: "Bearer" | (string & {});
  expires_in: number;
  refresh_token?: string;
  scope: string;
};

let serverAuthResults: AuthResults | null = null;

export function getServerAuth() {
  if (!serverAuthResults) {
    throw new Error("No access token available");
  }

  return serverAuthResults;
}

// This function ensures the auth token is automatically available on the server so you don't need to pass it to every server function.
// This wrapper function also automatically refreshes the access token on the server in a batched request when it expires and a refresh token is available
// the client wrapper then intercepts the refreshed token and caches it on the client for future requests.
export async function withAccessToken<
  T extends (...args: any[]) => Promise<any>
>(
  {
    action,
    accessToken,
  }: {
    action: T;
    accessToken: AuthResults | null;
  },
  ...args: Parameters<T>
): Promise<{ results: ReturnType<T>; latestToken?: AuthResults }> {
  "use server";
  if (!accessToken) {
    throw new Error(
      "No access token available on the server. Ensure the user is authenticated on the client."
    );
  }

  let latestToken: AuthResults | undefined;
  if (accessToken.expires_in < Date.now()) {
    if (!accessToken.refresh_token) {
      throw new Error("Can no longer refresh expired access token");
    }
    console.log(
      "[SPOTIFY]: Token expired. Refreshing:",
      accessToken.refresh_token
    );
    latestToken = await refreshTokenAsync(accessToken.refresh_token);
    console.log("[SPOTIFY]: Token refreshed:", latestToken);
  } else {
    // console.log(
    //   "[SPOTIFY]: Token still valid for:",
    //   accessToken.expires_in - Date.now()
    // );
  }
  serverAuthResults = latestToken ?? accessToken;

  return { results: await action(...args), latestToken };
}

// Fetch from Spotify with global auth results that are injected to the server by the Spotify auth context on the client.
// This is generally akin to how cookies work in a traditional web app in terms of DX.
export function fetchWithAuth(url: string, options: RequestInit = {}) {
  const auth = getServerAuth();

  return fetch(
    url.startsWith("/") ? new URL(url, "https://api.spotify.com") : url,
    {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `${auth.token_type} ${auth.access_token}`,
      },
    }
  );
}

// Fetch from spotify and handle the response to throw as an error.
export function fetchSpotifyDataAsync<TData extends any>(
  url: string,
  options: RequestInit = {}
): Promise<TData> {
  return fetchWithAuth(url, options).then((res) => handleSpotifyResponse(res));
}

// Helper function to handle Spotify API responses
async function handleSpotifyResponse<TData extends any>(
  response: Response
): Promise<TData> {
  const data = await response.json();
  if ("error" in data) {
    const err = new Error(data.error.message);
    // @ts-expect-error
    err.statusCode = data.error.status;
    throw err;
  }
  return data;
}
