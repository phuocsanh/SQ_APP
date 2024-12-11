import {Block, Pressable, Text} from 'components';
import React from 'react';
import {COLORS} from 'theme';

export default function DetailScreen() {
  return (
    <Block flex backgroundColor={COLORS.bgSuccess}>
      <Pressable marginTop={100} backgroundColor={COLORS.white}>
        <Text>{'go to profile'}</Text>
      </Pressable>
    </Block>
  );
}
