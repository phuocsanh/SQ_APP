import React, {memo, useState} from 'react';

import {Dimensions, Pressable} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {COLORS} from 'theme';
import {Block, Image} from 'components';
import {Banner} from 'models/other';
const {width} = Dimensions.get('window');

function CarouselBanner({data}: {data: Banner[]}) {
  const [idxCarouselFocused, setIdxCarouselFocused] = useState(0);
  return (
    <Block paddingBottom={25}>
      <Carousel
        loop
        autoPlay
        // mode="parallax"
        width={width}
        height={width * 0.4}
        data={data}
        scrollAnimationDuration={2500}
        onSnapToItem={(index: number) => {
          setIdxCarouselFocused(index);
        }}
        panGestureHandlerProps={{activeOffsetX: [-10, 10]}}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => (
          <Pressable style={{flex: 1}} key={index + item.toString()} onPress={() => {}}>
            <Image
              flex
              radius={8}
              contentFit="cover"
              // marginHorizontal={Platform.OS === 'android' ? 12 : 8} mode="parallax"
              marginHorizontal={12}
              source={item.banner}
            />
          </Pressable>
        )}
      />
      <Block marginTop={8} rowCenter alignSelf="center">
        {[...new Array(data.length).keys()].map((key, idx) => (
          <Block
            key={idx}
            square={idx === idxCarouselFocused ? 12 : 10}
            radius={10}
            backgroundColor={idxCarouselFocused === idx ? COLORS.primary : COLORS.brightGray}
            marginRight={5}
          />
        ))}
      </Block>
    </Block>
  );
}
export default memo(CarouselBanner);
