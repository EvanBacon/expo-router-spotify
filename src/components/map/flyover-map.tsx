'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { AppState, Image, StyleSheet } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

export const FlyoverMap = ({
  center,
  altitude,
}: {
  center: { latitude: number; longitude: number };
  altitude?: number;
}) => {
  const mapRef = useRef<import('react-native-maps').default>(null);

  const heading = useRef(0);
  const previousCenter = useRef(center);
  const interval = useRef<ReturnType<typeof requestAnimationFrame>>();
  const animatingRef = useRef<ReturnType<typeof setTimeout>>();

  const pitch = 50;
  const speed = 0.2;

  const animateCamera = useCallback(() => {
    if (!mapRef.current) return;

    mapRef.current.setCamera({
      center,
      pitch,
      altitude,
      heading: (heading.current = (heading.current - speed) % 360),
    });

    interval.current = requestAnimationFrame(animateCamera);
  }, [center, altitude]);

  useEffect(() => {
    const off = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        animateCamera();
      } else {
        clearInterval(interval.current);
      }
    });

    return () => {
      off.remove();
    };
  }, [animateCamera]);

  useEffect(() => {
    if (mapRef.current && previousCenter.current !== center) {
      clearInterval(interval.current);
      clearTimeout(animatingRef.current);
      previousCenter.current = center;
      mapRef.current?.animateCamera(
        {
          center,
          pitch,
          altitude,
          heading: heading.current,
        },
        {
          duration: 1000,
        }
      );

      animatingRef.current = setTimeout(() => {
        animateCamera();
      }, 1000);
    } else {
      animateCamera();
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [mapRef, animateCamera, altitude, center]);

  const isApple = process.env.EXPO_OS === 'ios';
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      mapType={isApple ? 'standard' : 'none'}
      //   mapType="hybridFlyover"
      showsCompass={false}
      userInterfaceStyle="dark"
      pitchEnabled={false}
      rotateEnabled={false}
      showsBuildings={false}
      showsIndoors={false}
      showsIndoorLevelPicker={false}
      showsMyLocationButton={false}
      showsPointsOfInterest={false}
      zoomEnabled={false}
      scrollEnabled={false}
      initialRegion={{
        latitude: center.latitude,
        longitude: center.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {!isApple && (
        <UrlTile
          urlTemplate="http://3.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          // urlTemplate="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
          zIndex={-1}
          // Test steps:
          // 1) Without new tile provider properties: comment out tileCachePath & maximumNativeZ
          // 2) With maximumNativeZ only to test scaling past maxNativeZoom level
          // 3) With doubleTileSize (only on Android)
          // 4) With tileCachePath too - test caching performance with cutting & throttling network connectivity
          // 5) With tileCacheMaxAge too
          // 6) With offlineMode=true too - test zoom in to test scaling of lower zoom level tiles to higher zoom levels
          //
          maximumNativeZ={19}
          // For testing activate different tile cache paths, examples below
          // work for simulator / emulator testing
          // This is for iOS simulator, both as fileURL and directory paths to be tested separately

          //tileCachePath="/Users/suomimar/Library/Developer/CoreSimulator/tiles"
          // This is for Android simulator, both as fileURL and directory paths to be tested separately
          //tileCachePath="file:///data/user/0/com.airbnb.android.react.maps.example/files/tiles"
          //tileCachePath="/data/user/0/com.airbnb.android.react.maps.example/files/tiles"
          tileCacheMaxAge={20}
          doubleTileSize={true}
          opacity={1.0}
        />
      )}

      {isApple && (
        <Marker coordinate={center} focusable={false} isTVSelectable={false} tappable={false}>
          <Image
            source={{
              uri: 'https://cloud.headwayapp.co/changelogs_images/images/big/000/016/393-90c8090df0a63e76991bc6aae7b46c87d8cdb51e.gif',
            }}
            style={{
              opacity: 0.05,
              width: 100,
              aspectRatio: 1,
            }}
          />
        </Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // pointerEvents: 'none',
    // backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
