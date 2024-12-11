import React from 'react';
import {COLORS} from 'theme';
import {ActivityIndicator, StyleProp, TextStyle} from 'react-native';
import {Text, TextProps} from '../Text';
import {Pressable, PressableProps} from '../Pressable';

export type ButtonProps = {
  title: string;
  loading?: boolean;
  color?: string;
  colorIndicator?: string;
  font?: TextProps['font'];
  fontSize?: number;
  radius?: number;
  styleText?: StyleProp<TextStyle>;
} & PressableProps;

export const Button = ({
  title = '',
  loading,
  height = 40,
  disabled,
  fontSize = 16,
  font = 'bold',
  radius = 100,
  backgroundColor = COLORS.primary,
  marginHorizontal = 0,
  color = COLORS.white,
  colorIndicator = COLORS.white,
  styleText,
  ...containerProps
}: ButtonProps) => {
  return (
    <Pressable
      radius={radius}
      backgroundColor={backgroundColor}
      alignItems="center"
      justifyContent="center"
      height={height}
      marginHorizontal={marginHorizontal}
      disabled={loading || disabled}
      {...containerProps}>
      {loading ? (
        <ActivityIndicator size="small" color={colorIndicator} />
      ) : (
        <Text color={color} font={font} fontSize={fontSize} style={styleText}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};
