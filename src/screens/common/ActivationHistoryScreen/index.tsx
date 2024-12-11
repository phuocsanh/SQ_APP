import {Block, HeaderTitleNoBackground, Pressable, Text} from 'components';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import Guarantee from './components/Guarantee';
import Sell from './components/Sell';

const ActivationHistoryScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const [isTab, setIsTab] = useState(true);

  return (
    <Block flex backgroundColor={COLORS.red}>
      <HeaderTitleNoBackground title="Tra Cứu Kích Hoạt" canGoBack />
      <Block flex backgroundColor={COLORS.aliceBlue}>
        <Block
          width={'100%'}
          borderBottomWidth={1}
          borderBottomColor={COLORS.brightSignalGray}
          rowCenter>
          <Pressable
            height={42}
            width={'50%'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backgroundColor={COLORS.aliceBlue}
            onPress={() => {
              setIsTab(true);
            }}>
            <Text
              marginTop={10}
              font={isTab ? 'bold' : 'regular'}
              fontSize={18}
              color={COLORS.black}>
              {'Bán Hàng'}
            </Text>
            <Block
              radius={2}
              height={3}
              width={'80%'}
              backgroundColor={isTab ? COLORS.primary : COLORS.aliceBlue}
            />
          </Pressable>
          <Pressable
            height={42}
            width={'50%'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backgroundColor={COLORS.aliceBlue}
            onPress={() => {
              setIsTab(false);
            }}>
            <Text
              marginTop={10}
              font={!isTab ? 'bold' : 'regular'}
              fontSize={18}
              color={COLORS.black}>
              {'Bảo Hành'}
            </Text>
            <Block
              radius={2}
              height={3}
              width={'80%'}
              backgroundColor={!isTab ? COLORS.primary : COLORS.aliceBlue}
            />
          </Pressable>
        </Block>
        <Block
          paddingHorizontal={16}
          paddingTop={14}
          paddingBottom={bottom > 10 ? bottom : 30}
          flex>
          {isTab ? <Sell /> : <Guarantee />}
        </Block>
      </Block>
    </Block>
  );
};

export default ActivationHistoryScreen;
