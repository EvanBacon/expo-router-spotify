import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={19} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        fillOpacity={0.85}
        d="M7.402 18.447c.508 0 .87-.351.87-.86V4.728l-.098-2.91-.557.195 3.506 3.838 2.227 2.187c.156.156.38.234.615.234.488 0 .84-.37.84-.85a.879.879 0 0 0-.264-.634L8.057.293A.885.885 0 0 0 7.402 0a.885.885 0 0 0-.654.293L.273 6.787c-.185.195-.273.4-.273.635 0 .478.352.85.84.85.234 0 .469-.079.615-.235L3.682 5.85l3.496-3.838-.547-.196-.098 2.91v12.862c0 .508.362.86.87.86Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#000" d="M0 0h14.805v18.447H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
