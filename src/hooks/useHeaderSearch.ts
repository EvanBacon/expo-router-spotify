/// <reference types="react/canary" />

import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SearchBarProps } from "react-native-screens";
import * as AC from "@bacons/apple-colors";

export function useHeaderSearch(options: Omit<SearchBarProps, "ref"> = {}) {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const interceptedOptions: SearchBarProps = {
      ...(options ?? {}),
      onChangeText(event) {
        setSearch(event.nativeEvent.text);
        options.onChangeText?.(event);
      },
      onSearchButtonPress(e) {
        setSearch(e.nativeEvent.text);
        options.onSearchButtonPress?.(e);
      },
      tintColor: AC.label,

      onCancelButtonPress(e) {
        setSearch("");
        options.onCancelButtonPress?.(e);
      },
    };

    navigation.setOptions({
      headerShown: true,
      headerSearchBarOptions: interceptedOptions,
    });
  }, [options]);

  return search;
}
