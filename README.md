# Expo Router Spotify Demo

This is a demo project that uses [React Server Components in Expo Router](https://docs.expo.dev/guides/server-components/) to securely authenticate and make requests to the Spotify API.

https://github.com/user-attachments/assets/8f9740eb-2ee2-4b26-b6cb-93b0b3a8461b

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

## Authentication

I use a global provider to setup [expo-auth-session](https://docs.expo.dev/guides/authentication/#spotify) then store the results using a `localStorage` polyfill. The code exchange is then performed securely in a React server function with the client secret, this gives us a long-lived access token. 

The request object is sent to server functions which are wrapped with a helper layer that ensures the access token is refreshed when it becomes invalid, this all happens behind the scenes which is pretty nice and scales well across all requests.

This ability to wrap server calls on both the client and server-side in a composable way is a super powerful concept. Being able to abstract away the entire authentication system across all platforms and frontend/backend is magical. Likely a lot of untapped potential here.

## Data fetching

Data is fetched in the server and passed to client components for rendering interactive elements. Using server actions makes these sections composable so we can use them in different parts of the app. For example, search is inlined on native but uses a standalone route on web.

To memoize the React Server Function calls, I've enabled React compiler. This ensures server calls only happen when the arguments of a server function are called.

## UI

For the components, I'm using this template https://github.com/EvanBacon/expo-router-forms-components. I've added some header animations on native to brighten up the app and give it some personality.

For web, I use a custom header that looks and acts more like what you'd expect from a website. The authentication modal uses a customized version of vaul that works better in desktop screens.


