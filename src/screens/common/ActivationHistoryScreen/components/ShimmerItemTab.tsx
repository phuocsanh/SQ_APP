import {Block, ScrollView, Shimmer} from 'components';

import React from 'react';
import {COLORS} from 'theme';

const ShimmerItemTab = () => {
  const _renderItem = () => {
    return [...Array(5)].map((_, i) => (
      <Block
        key={i}
        marginTop={15}
        backgroundColor={COLORS.white}
        radius={8}
        paddingHorizontal={9}
        paddingVertical={12}
        row>
        <Shimmer width={78} height={58} radius={12} />
        <Block justifyContent={'space-between'} paddingLeft={10} flex>
          <Shimmer width={150} height={16.5} radius={3} />
          <Shimmer width={150} height={16.5} radius={3} />
          <Shimmer width={150} height={16.5} radius={3} />
        </Block>
      </Block>
    ));
  };

  return <ScrollView>{_renderItem()}</ScrollView>;
};

export default ShimmerItemTab;
