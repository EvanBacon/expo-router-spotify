import React from "react";
import { Text, View } from "react-native";

import { makeTaggedTemplate } from "./chalk-template";

export function codeColorLikeChalk(
  strings: TemplateStringsArray,
  ...expressions: any[]
) {
  // Concatenate strings and expressions to form the input string
  const inputString = strings.reduce((result, str, i) => {
    const expression = expressions[i] || "";
    return result + str + expression;
  }, "");

  const colorRegex = /{(\w+) (.*?)}/g;
  const matches = inputString.match(colorRegex);

  if (!matches) {
    return [];
  }

  const result = matches.map((match) => {
    const colorMatch = match.match(colorRegex);
    if (colorMatch) {
      return {
        text: colorMatch[2],
        color: colorMatch[1],
      };
    } else {
      // Text not wrapped in `{}`, assume default color
      return {
        text: match,
        color: null, // or specify a default color if needed
      };
    }
  });

  return result;
}

export function getColoredFunctionJsx(func: string, arg?: string) {
  if (arg != null) {
    return (
      <CodeStep
        code={rnchalk`{green ${func}}{pink (}{yellow "${arg}"}{pink )}`}
      />
    );
  }
  return <CodeStep code={rnchalk`{green ${func}}{pink ()}`} />;
}

export function CodeStep({ code }: { code: React.ReactNode }) {
  return (
    <View style={{ padding: 16, justifyContent: "center", marginBottom: 8 }}>
      <Text
        style={{
          fontFamily: "AnonymousPro-Regular",
          color: DRACULA_COLORS.white,
          // fontFamily: 'monospace',
          fontSize: 16,
        }}
      >
        {code}
      </Text>
    </View>
  );
}

const DRACULA_COLORS = {
  purple: "rgb(189, 147, 249)",
  blue: "#A1E7FA",
  yellow: "rgb(241, 250, 140)",
  pink: "rgb(255, 121, 198)",
  green: "rgb(80, 250, 123)",
  white: "rgb(248, 248, 242)",
};

export const rnchalk = makeTaggedTemplate(
  Object.fromEntries(
    Object.entries(DRACULA_COLORS).map(([color, value]) => {
      return [
        color,
        (text: string) => {
          //   console.log('>', text);
          return (
            <Text
              key={Date.now() + Math.random()}
              style={{
                color: value,
              }}
            >
              {text}
            </Text>
          );
        },
      ];
    })
  )
);
