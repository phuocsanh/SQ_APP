import {Block} from 'components/base/Block';
import {Icon} from 'components/base/Icon';
import {Pressable} from 'components/base/Pressable';
import {Text} from 'components/base/Text';
import {navigationRef} from 'navigation/navigationRef';
import React, {ReactElement} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';

export type HeaderTitleNoBackgroundProps = {
  title: string;
  titleSize?: number;
  canGoBack?: boolean;
  onGoBack?: () => void;
  topOffset?: number;
  height?: number;
  renderRight?: () => ReactElement;
};

export const HeaderTitleNoBackground = ({
  title,
  titleSize = 18,
  canGoBack = true,
  onGoBack = navigationRef.goBack,

  renderRight,
}: HeaderTitleNoBackgroundProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <Block
      backgroundColor={COLORS.white}
      style={{
        paddingTop: top,
        paddingBottom: 23,
      }}>
      <Block paddingHorizontal={5}>
        <Block marginTop={13} rowCenter height={28} paddingHorizontal={15}>
          {canGoBack && (
            <Pressable square={40} onPress={onGoBack} justifyContent="center">
              <Icon
                type="FontAwesome6"
                name="arrow-left"
                size={20}
                color={COLORS.darkJungleGreen}
              />
            </Pressable>
          )}
          <Text
            textAlign="center"
            color={COLORS.black}
            font={'bold'}
            fontSize={titleSize}
            flex
            numberOfLines={1}>
            {title}
          </Text>
          {renderRight ? renderRight() : <Block square={40} />}
        </Block>
      </Block>
    </Block>
  );
};
