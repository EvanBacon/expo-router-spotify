/// <reference types="react/canary" />

"use client";

import * as React from "react";
import { View, Image } from "react-native";

import SpotifyButton from "@/components/spotify-auth-button";
import * as Form from "@/components/ui/Form";

export default function SignInRoute() {
  return (
    <Form.List>
      <Form.Section>
        <View style={{ alignItems: "center", gap: 8, padding: 8, flex: 1 }}>
          <Image
            source={{ uri: "https://github.com/expo.png" }}
            style={{
              aspectRatio: 1,
              height: 64,
              borderRadius: 8,
            }}
          />

          <SpotifyButton />
        </View>
      </Form.Section>
      <Form.Section>
        <Form.Link
          target="_blank"
          href="https://github.com/evanbacon/expo-router-spotify"
        >
          View Source
        </Form.Link>
      </Form.Section>
    </Form.List>
  );
}
