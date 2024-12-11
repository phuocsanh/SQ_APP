import React from 'react';
import {COLORS} from 'theme';
import {Icon} from '../Icon';
import {Pressable, PressableProps} from '../Pressable';

type CheckBoxProps = PressableProps & {
  isCheck?: boolean;
  inActiveColor?: string;
  activeColor?: string;
  size?: number;
};

export const CheckBox = ({
  isCheck = false,
  inActiveColor = COLORS.white,
  activeColor = COLORS.americanYellow,
  size = 20,
  ...props
}: CheckBoxProps) => {
  return (
    <Pressable
      square={size}
      radius={size / 4}
      backgroundColor={isCheck ? activeColor : inActiveColor}
      borderWidth={1}
      borderColor={isCheck ? activeColor : COLORS.ligthSilver}
      contentCenter
      {...props}>
      {isCheck && (
        <Icon type="FontAwesome5" name={'check'} color={COLORS.white} solid size={size * 0.65} />
      )}
    </Pressable>
  );
};
