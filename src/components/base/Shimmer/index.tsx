import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GRADIENT, hs} from 'theme';
import {Block, BlockProps} from '../Block';

export const Shimmer = ({
  width,
  style,
  speed = 'normal',
  linearColors = GRADIENT.shimmer,
  backgroundColor = GRADIENT.shimmer[0],
  ...props
}: Omit<BlockProps, 'width'> & {
  width: number;
  linearColors?: string[];
  backgroundColor?: string;
  /**
   * - normal: 1000
   * - slow: 2000
   * @default normal
   */
  speed?: 'normal' | 'slow' | number;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: typeof speed === 'number' ? speed : speed === 'slow' ? 2000 : 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, [animatedValue, speed]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-hs(width), hs(width)],
  });

  return (
    <Block
      backgroundColor={backgroundColor}
      style={[style, {overflow: 'hidden'}]}
      height={50}
      radius={10}
      width={width}
      {...props}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{translateX}],
        }}>
        <LinearGradient
          style={{flex: 1}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={linearColors}
        />
      </Animated.View>
    </Block>
  );
};
