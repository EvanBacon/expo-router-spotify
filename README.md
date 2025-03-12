# Expo Router Spotify Demo

This is a demo project that uses [React Server Components in Expo Router](https://docs.expo.dev/guides/server-components/) to securely authenticate and make requests to the Spotify API.

Data is fetched at the edge, rendered on the server, and streamed back to the client (iOS, Android, and web).

This template demonstrates how you can setup a cookies-like system for making the client authentication results automatically available to the server.

Server action results are also cached in-memory for 60 seconds to demonstrate reducing the number of requests to the server.

This demo requires environment variables in the `.env` file. You can get these in the [Spotify developer portal](https://developer.spotify.com/dashboard).

```
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
```

The client secret will never be available in the client bundle for any platform and will only ever be used on the server. This ensures malicious actors cannot access your API.

Try it in the browser with EAS Hosting https://rsc-spotify.expo.app/ (pending Spotify API approval)
