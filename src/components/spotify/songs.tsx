import { View, Text, Image } from "react-native";
import { SkeletonBox } from "@/components/skeleton";
import ExternalLink from "@/components/external-link";

export function SongItem({
  image,
  title,
  artist,
  href,
}: {
  image: string;
  title: string;
  artist: string;
  href: string;
}) {
  const SIZE = 150;
  return (
    <ExternalLink href={href}>
      <View style={{ alignItems: "center", gap: 8, maxWidth: SIZE }}>
        <Image
          // title={title},
          source={{ uri: image }}
          style={{
            width: SIZE,
            height: SIZE,
            overflow: "hidden",
            backgroundColor: "rgb(205, 205, 205)",
            borderRadius: 8,
          }}
          // menuItems={[
          //   {
          //     title: "More like this",
          //     icon: "music.note",
          //     prompt: [
          //       "Find more songs like this",
          //       `Play more songs like "${title}" by "${artist}"`,
          //     ],
          //   },
          // ]}
        />

        <View style={{ alignItems: "center", gap: 4 }}>
          <Text
            numberOfLines={2}
            style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={2}
            style={{ fontSize: 12, opacity: 0.8, textAlign: "center" }}
          >
            {artist}
          </Text>
        </View>
      </View>
    </ExternalLink>
  );
}

export function SongItemSkeleton() {
  const SIZE = 150;
  return (
    <View style={{ alignItems: "center", gap: 8, maxWidth: SIZE }}>
      <SkeletonBox width={SIZE} height={SIZE} borderRadius={8} />
      <View style={{ alignItems: "center", gap: 4 }}>
        <SkeletonBox width={"100%"} height={16} />
        <SkeletonBox width={"75%"} height={16} />
      </View>
    </View>
  );
}
