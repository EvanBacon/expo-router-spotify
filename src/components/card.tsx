import { Text, View, ViewProps } from "react-native";

import SkeletonLoading from "./skeleton";

export function CardHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <View
        style={{
          borderRadius: 8,
          backgroundColor: "#000",
          flexDirection: "row",
          alignItems: "center",

          padding: 4,
          gap: 8,
          aspectRatio: 1,
        }}
      >
        {icon}
      </View>

      <Text
        style={{
          fontSize: 16,
          // fontFamily: 'AnonymousPro-Bold',
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export function Card({
  style,
  title,
  children,
  ...props
}: ViewProps & { title?: string }) {
  return (
    <View style={{ paddingHorizontal: 16, gap: 8, flex: 1 }}>
      {title && (
        <Text
          style={{
            fontSize: 24,
            // fontFamily: 'AnonymousPro-Bold',
            color: "white",
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      )}
      <View
        style={[
          {
            padding: 16,
            maxWidth: 608,
            borderCurve: "continuous",
            borderRadius: 12,
            gap: 8,
            flexShrink: 0,
            overflow: "hidden",
            backgroundColor: "white",
          },
          // {
          //   backgroundImage: 'radial-gradient(rgb(209, 209, 209) 1px, transparent 0px)',
          //   backgroundPosition: 'fixed 0 0',
          //   backgroundSize: '10px 10px',
          // },
          style,
        ]}
      >
        {/* <View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundImage:
                'linear-gradient(185deg, rgba(255, 255, 255, 0), rgb(255, 255, 255) 300px)',
            },
          ]}
        /> */}
        {children}
      </View>
    </View>
  );
}

export function CardSkeleton() {
  //   return <MapSkeleton />;
  return (
    <Card title="Loading...">
      <SkeletonLoading isLoading />
      <SkeletonLoading isLoading style={{ width: "75%" }} />
    </Card>
  );
}
export function MapSkeleton() {
  return (
    <Card title="Searching area...">
      <SkeletonLoading isLoading style={{ height: 240 }} />
      <SkeletonLoading isLoading style={{ height: 96 }} delay={200} />
    </Card>
  );
}

export function AssistantMessage({ children }) {
  return (
    <Text
      style={{
        color: "white",
        fontFamily: "AnonymousPro-Regular",
        paddingHorizontal: 16,
        paddingBottom: 8,
        fontSize: 16,
      }}
    >
      <Text style={{ color: "gray" }}>{`> `}</Text>
      {children}
    </Text>
  );
}
