'use client';
import MapView from 'react-native-maps';

export function MapBackdrop({
  children,
  pins,
  ...props
}: React.ComponentProps<typeof MapView> & { pins: { lat: number; lon: number }[] }) {
  return (
    <MapView
      {...props}
      showsIndoorLevelPicker={false}
      showsMyLocationButton={false}
      showsScale={false}
      showsTraffic={false}
      showsPointsOfInterest={false}
      pitchEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      mapType="standard"
      camera={{
        pitch: 35,
        center: {
          latitude: pins[0].lat,
          longitude: pins[0].lon + 0.001,
        },
        altitude: 1000,
        heading: 180,
      }}
      userInterfaceStyle="dark"
    />
  );
}
