import {Block} from 'components';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {width as _width} from 'theme';

type QrMaskProps = Partial<{
  width: number;
  height: number;
  strokeWidth: number;
  strokeLength: number;
}>;
const QrMask = ({
  width = _width * 0.65,
  height = _width * 0.65,
  strokeLength = 30,
  strokeWidth = 4,
}: QrMaskProps) => {
  return (
    <Svg width={`${width}`} height={`${height}`} viewBox={`0 0 ${width} ${height}`} fill="none">
      <Block
        style={{width: width - strokeWidth * 2, height: height - strokeWidth * 2}}
        margin={strokeWidth}
      />
      {/* top left */}
      <Path
        d={`M${strokeWidth / 2} ${strokeLength}V${strokeWidth / 2}H${strokeLength}`}
        stroke="#FFFFFF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* top right */}
      <Path
        d={`M${width - strokeLength} ${strokeWidth / 2}H${width - strokeWidth / 2}V${strokeLength}`}
        stroke="#FFFFFF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* bottom right */}
      <Path
        d={`M${width - strokeWidth / 2} ${height - strokeLength}V${height - strokeWidth / 2}H${width - strokeLength}`}
        stroke="#FFFFFF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* bottom left */}
      <Path
        d={`M${strokeLength} ${height - strokeWidth / 2}H${strokeWidth / 2}V${height - strokeLength}`}
        stroke="#FFFFFF"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default QrMask;
