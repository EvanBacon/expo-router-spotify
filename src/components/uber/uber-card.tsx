import { Image, Text, View } from "react-native";

import { Card } from "@/components/card";
import SkeletonLoading from "@/components/skeleton";
import ExternalLink, { SubtleScaleAndFadeIn } from "@/components/external-link";
import { MapBackdrop } from "./map-backdrop";

const IMAGES = {
  black: {
    image: require("./assets/uber_black.png"),
    title: "Premium",
  },
  default: {
    image: require("./assets/uber_x.png"),
    title: "UberX",
  },
};

export function UberSkeleton() {
  return (
    <SubtleScaleAndFadeIn>
      <Card>
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <SkeletonLoading
            style={{ borderRadius: 888, height: 64, width: 64 }}
          />
          <SkeletonLoading delay={50} style={{ width: "40%", height: 8 }} />
        </View>
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <SkeletonLoading
            style={{ borderRadius: 888, height: 64, width: 64 }}
          />
          <SkeletonLoading delay={50} style={{ width: "60%", height: 8 }} />
        </View>

        <SkeletonLoading delay={100} style={{ width: "75%", height: 36 }} />
      </Card>
    </SubtleScaleAndFadeIn>
  );
}

export function UberCard({
  rides,
  coordinate,
}: {
  rides: {
    type: keyof typeof IMAGES;

    dropoffEta: string;
    pickupEta: string;
    price: string;
  }[];
  coordinate: { lat: number; lon: number };
}) {
  // https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction
  const url = new URL("https://m.uber.com/ul/");
  url.searchParams.append("client_id", process.env.UBER_CLIENT_ID);
  url.searchParams.append("action", "setPickup");
  url.searchParams.append("dropoff[latitude]", coordinate.lat.toString());
  url.searchParams.append("dropoff[longitude]", coordinate.lon.toString());

  return (
    <Card>
      <MapBackdrop
        pins={[coordinate]}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "30%",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: "300%",
          backgroundColor: "white",
          transform: [
            { translateY: -100 },
            { translateX: -100 },
            // { translateX: '-15%' },
            //
            { rotate: "15deg" },
          ],
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <View style={{ maxWidth: "75%", gap: 8, flex: 1 }}>
          {rides.map((ride, index) => (
            <View
              key={index}
              style={{
                height: 64,
                flexGrow: 1,
                flexDirection: "row",

                alignItems: "center",
                gap: 8,
              }}
            >
              <Image
                source={IMAGES[ride.type].image}
                style={{ width: 64, height: 64 }}
              />
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {IMAGES[ride.type].title} — {ride.price}
                </Text>
                <Text style={{ fontSize: 16, color: "#686F81" }}>
                  {ride.pickupEta} • {ride.dropoffEta}
                </Text>
              </View>
            </View>
          ))}
          <ExternalLink href={url.toString()}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                  color: "white",
                  paddingVertical: 8,
                }}
              >
                Request Uber
              </Text>
            </View>
          </ExternalLink>
        </View>
      </View>

      <Image
        source={require("./assets/uber_icon.png")}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 24,
          height: 24,
        }}
      />
    </Card>
  );
}
