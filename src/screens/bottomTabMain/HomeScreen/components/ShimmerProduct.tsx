import {Block} from 'components';
import {Shimmer} from 'components/base/Shimmer';
import React from 'react';
import {COLORS, width} from 'theme';
const scaleW = 0.35,
  scaleH = 0.25,
  textH = 22;
const ShimmerProduct = () => {
  return (
    <Block marginBottom={25} row>
      <Block backgroundColor={COLORS.ghostWhite}>
        <Shimmer height={width * scaleH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
      </Block>
      <Block marginLeft={20} backgroundColor={COLORS.ghostWhite}>
        <Shimmer height={width * scaleH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
      </Block>
      <Block marginLeft={20} backgroundColor={COLORS.ghostWhite}>
        <Shimmer radius={5} height={width * scaleH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
        <Shimmer radius={5} marginTop={8} height={textH} width={width * scaleW} />
      </Block>
    </Block>
  );
};

export default ShimmerProduct;
