import {Block, Shimmer} from 'components';
import React from 'react';
import {COLORS, width} from 'theme';

const ShimmerNoti = () => {
  return (
    <Block paddingHorizontal={15}>
      {Array.from({length: 10}).map((_item, idx) => (
        <Block key={idx}>
          <Block row paddingVertical={10}>
            <Shimmer width={30} height={30} />
            <Block marginLeft={10} justifyContent="space-between">
              <Shimmer width={width - 80} height={50} />
              <Shimmer radius={5} marginTop={10} width={width / 4} height={15} />
            </Block>
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} width={'100%'} />
        </Block>
      ))}
    </Block>
  );
};

export default ShimmerNoti;
