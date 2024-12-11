import React from 'react';
import LottieView, {LottieViewProps} from 'lottie-react-native';
import {LOTTIES} from 'assets';
import {Block} from '../Block';
import {Text} from '../Text';
type EmptyDataProps = {
  width?: number;
  height?: number;
  title?: string;
  source?: LottieViewProps['source'];
};
export const EmptyData = ({
  width = 200,
  height = 200,
  title = 'Không có dữ liệu!',
  source = LOTTIES.empty,
}: EmptyDataProps) => {
  return (
    <Block justifyContent="center" alignItems="center" radius={10}>
      <LottieView loop autoPlay source={source} style={{width: width, height: height}} />
      <Text marginBottom={60} fontSize={16}>
        {title}
      </Text>
    </Block>
  );
};
