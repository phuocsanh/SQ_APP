import {Block} from 'components';
import {Shimmer} from 'components/base/Shimmer';
import React from 'react';
import {COLORS, width} from 'theme';

const ShimmerNews = () => {
  return (
    <Block row marginBottom={25}>
      <Block backgroundColor={COLORS.ghostWhite} radius={10}>
        <Shimmer height={width * 0.28} width={width - 80} />
        <Shimmer marginTop={5} height={30} width={width - 80} />
        <Shimmer marginTop={5} height={30} width={width / 3} />
      </Block>
      <Block marginLeft={15} backgroundColor={COLORS.ghostWhite} radius={10}>
        <Shimmer height={width * 0.28} width={width - 80} />
        <Shimmer marginTop={5} height={30} width={width - 80} />
        <Shimmer marginTop={5} height={30} width={width / 3} />
      </Block>
    </Block>
  );
};

export default ShimmerNews;
