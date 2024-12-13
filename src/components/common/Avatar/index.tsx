import {Block, BlockProps} from 'components/base/Block';
import {Icon} from 'components/base/Icon';
import {Image, ImageProps} from 'components/base/Image';
import {Text} from 'components/base/Text';
import React, {useState} from 'react';
import {COLORS} from 'theme';

type AvatarProps = Partial<{
  name: string;
  uri: string;
  size: number;
  fontDecrease: number;
  contentFit: ImageProps['contentFit'];
}>;

export const Avatar = ({
  name = '',
  uri,
  size = 50,
  fontDecrease = 3,
  contentFit = 'cover',
  backgroundColor = COLORS.lightSkyBlue,
  ...props
}: AvatarProps & BlockProps) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const bgColor =
    uri && !loadFailed ? COLORS.transparent : name ? backgroundColor : COLORS.blizzardBlue;

  const _renderInner = () => {
    if (uri && !loadFailed) {
      return (
        <Image
          round={size}
          onError={() => setLoadFailed(true)}
          source={uri}
          contentFit={contentFit}
        />
      );
    } else if (name) {
      if (/^\d+$/.test(name)) {
        return (
          <Icon
            solid
            type={'FontAwesome5'}
            name="user"
            color="primary"
            size={size / fontDecrease}
          />
        );
      } else {
        return (
          <Text
            paddingHorizontal={5}
            numberOfLines={1}
            color={COLORS.white}
            fontSize={size / fontDecrease}>
            {getInitials(name.replace(/[^\w\s]/gi, ''))}
          </Text>
        );
      }
    }
  };

  return (
    <Block round={size} contentCenter backgroundColor={bgColor} {...props}>
      {_renderInner()}
    </Block>
  );
};

function getInitials(name: string) {
  const words = name.split(' ');
  let result = '';
  for (const word of words) {
    result += word.charAt(0).toUpperCase();
  }
  if (!result) {
    console.warn('Could not get abbr from name');
    result = name;
  }
  return result;
}
