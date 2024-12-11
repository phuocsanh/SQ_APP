import {Block} from 'components/base/Block';
import {Icon} from 'components/base/Icon';
import {Pressable} from 'components/base/Pressable';
import {Text} from 'components/base/Text';
import {navigationRef} from 'navigation/navigationRef';
import React, {ReactElement} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, ShadowLevel} from 'theme';

type HeaderTitleProps = {
  title?: string;
  canGoBack?: boolean;
  onGoBack?: () => void;
  renderRight?: () => ReactElement;
  shawdow?: ShadowLevel;
};

export const HeaderTitle = ({
  title = '',
  canGoBack = true,
  onGoBack = navigationRef.goBack,
  renderRight,
  shawdow,
}: HeaderTitleProps) => {
  const {top} = useSafeAreaInsets();
  return (
    <Block height={62.3 + top} safePaddingTop shadow={shawdow}>
      <Block flex paddingHorizontal={15} rowCenter>
        {canGoBack && (
          <Pressable square={40} onPress={onGoBack} justifyContent="center">
            <Icon type="FontAwesome6" name="arrow-left" size={20} color={COLORS.darkJungleGreen} />
          </Pressable>
        )}
        <Text
          textAlign="center"
          color={COLORS.black}
          font={'bold'}
          fontSize={18}
          flex
          numberOfLines={1}>
          {title}
        </Text>
        {renderRight ? renderRight() : <Block square={40} />}
      </Block>
    </Block>
  );
};
