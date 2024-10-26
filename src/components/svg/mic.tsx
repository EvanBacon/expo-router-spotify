import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={14} height={23} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.fill}
        fillOpacity={0.85}
        d="M0 10.322c0 3.828 2.53 6.514 6.25 6.826v2.276H2.627a.742.742 0 0 0-.742.742c0 .41.332.732.742.732h8.72c.41 0 .743-.322.743-.732a.742.742 0 0 0-.742-.742H7.725v-2.276c3.73-.312 6.25-2.998 6.25-6.826V8.34a.725.725 0 0 0-.733-.733.734.734 0 0 0-.742.733v1.924c0 3.33-2.168 5.537-5.508 5.537-3.35 0-5.517-2.207-5.517-5.537V8.34a.728.728 0 0 0-.743-.733A.725.725 0 0 0 0 8.34v1.982Zm3.438-.351c0 2.246 1.445 3.828 3.554 3.828 2.1 0 3.545-1.582 3.545-3.828V3.828C10.537 1.572 9.092 0 6.992 0c-2.11 0-3.554 1.572-3.554 3.828v6.143Zm1.474 0V3.828c0-1.445.83-2.373 2.08-2.373s2.07.928 2.07 2.373v6.143c0 1.445-.82 2.373-2.07 2.373s-2.08-.928-2.08-2.373Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.fill} d="M0 0h13.975v22.295H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
