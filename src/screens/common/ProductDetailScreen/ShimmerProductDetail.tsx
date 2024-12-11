import {Block, Shimmer, Text} from 'components';
import React from 'react';
import {COLORS, height, width} from 'theme';

const ShimmerProductDetail = () => {
  return (
    <Block flex>
      <Block>
        <Shimmer width={width} height={height / 3.3} />
        <Block row padding={15}>
          {Array.from({length: 5}).map((p, idx) => (
            <Shimmer key={idx} radius={8} marginRight={12} width={62} height={50} />
          ))}
        </Block>
        <Text marginLeft={15} marginTop={20} font="bold" fontSize={16} color={COLORS.romanSilver}>
          Thông Tin Sản Phẩm
        </Text>
        <Block paddingHorizontal={15}>
          {Array.from({length: 7}).map((i, idx) => (
            <Block key={idx} marginTop={10} rowCenter justifyContent="space-between">
              <Shimmer radius={3} width={width / (idx % 2 === 0 ? 5 : 4)} height={15} />
              <Shimmer radius={3} width={width / (idx % 2 === 0 ? 5 : 6)} height={15} />
            </Block>
          ))}

          <Block height={1} backgroundColor={COLORS.antiFlashWhite} marginVertical={18} />
          <Text font="bold" fontSize={16} color={COLORS.romanSilver}>
            Mô Tả Sản Phẩm
          </Text>
          <Shimmer marginTop={20} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
          <Shimmer marginTop={5} radius={3} width={width - 30} height={15} />
        </Block>
      </Block>
    </Block>
  );
};

export default ShimmerProductDetail;
