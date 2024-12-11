import {Block, Icon, ScrollView, Shimmer} from 'components';

import React from 'react';
import {COLORS} from 'theme';

const ShimmerItemTab = () => {
  const _renderItem = () => {
    return [...Array(5)].map((_, i) => (
      <Block key={i} marginBottom={15} backgroundColor={COLORS.white} radius={8} padding={8} row>
        <Shimmer width={118} height={92} radius={12} />
        <Block justifyContent={'space-between'} paddingLeft={10} flex>
          <Block>
            <Shimmer width={150} height={20} radius={3} />
            <Shimmer width={80} marginTop={5} height={20} radius={3} />
          </Block>

          <Block rowCenter>
            <Icon name={'clock'} type={'EvilIcons'} size={15} color={COLORS.philippineGray1} />
            <Shimmer marginLeft={3} width={60} height={20} radius={3} />
          </Block>
        </Block>
      </Block>
    ));
  };

  return <ScrollView>{_renderItem()}</ScrollView>;
};

export default ShimmerItemTab;
