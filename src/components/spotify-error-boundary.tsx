/// <reference types="react/canary" />

"use client";

import * as React from "react";

import { useSpotifyAuth } from "@/lib/spotify-auth";

import { Text, Button } from "react-native";
import * as Form from "@/components/ui/Form";

// NOTE: This won't get called because server action invocation happens at the root :(
export function SpotifyErrorBoundary({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  const spotifyAuth = useSpotifyAuth();

  console.log("SpotifyError:", error);
  React.useEffect(() => {
    if (error.message.includes("access token expired")) {
      spotifyAuth?.clearAccessToken();
    }
  }, [error, spotifyAuth]);

  return (
    <Form.List>
      <Form.Section title="Error">
        <Text>{error.toString()}</Text>
        <Button title="Retry" onPress={retry} />
      </Form.Section>
    </Form.List>
  );
}
