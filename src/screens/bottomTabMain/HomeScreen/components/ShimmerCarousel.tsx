import {Block} from 'components';
import {Shimmer} from 'components/base/Shimmer';
import React from 'react';
import {width} from 'theme';

const ShimmerCarousel = () => {
  return (
    <Block marginHorizontal={15} marginBottom={25}>
      <Shimmer height={width * 0.4} width={width - 30} />
    </Block>
  );
};

export default ShimmerCarousel;
