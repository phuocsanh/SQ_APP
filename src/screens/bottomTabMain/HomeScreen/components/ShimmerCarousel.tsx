import {Block} from 'components';
import {Shimmer} from 'components/base/Shimmer';
import React from 'react';
import {rhs, width} from 'theme';

const ShimmerCarousel = () => {
  return (
    <Block marginHorizontal={15} marginBottom={25}>
      <Shimmer height={width * 0.4} width={rhs(width - 30)} />
    </Block>
  );
};

export default ShimmerCarousel;
