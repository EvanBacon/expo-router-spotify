import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={11} fill="none" {...props}>
    <G fill="#fff" fillOpacity={0.85} clipPath="url(#a)">
      <Path d="M.732 10.03h18.282c.41 0 .742-.333.742-.753a.734.734 0 0 0-.742-.732H.732A.725.725 0 0 0 0 9.277c0 .42.322.752.732.752ZM.732 5.762h18.282c.41 0 .742-.323.742-.733a.744.744 0 0 0-.742-.752H.732A.736.736 0 0 0 0 5.03c0 .41.322.733.732.733ZM.732 1.504h18.282c.41 0 .742-.322.742-.733a.742.742 0 0 0-.742-.742H.732A.734.734 0 0 0 0 .771c0 .41.322.733.732.733Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h19.756v10.029H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
