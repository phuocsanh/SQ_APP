import {Block, Pressable, Text} from 'components';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, GRADIENT} from 'theme';
import All from './components/All';
import New from './components/New';
import LinearGradient from 'react-native-linear-gradient';
import {Platform} from 'react-native';

export default function NewsScreen() {
  const {top} = useSafeAreaInsets();
  const [isTab, setIsTab] = useState(true);

  return (
    <Block flex backgroundColor={COLORS.white}>
      <Block position="absolute" width={'100%'}>
        <LinearGradient
          colors={GRADIENT.header}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 162 + top,
            paddingTop: Platform.OS === 'ios' ? top : top + 10,
          }}
        />
      </Block>
      <Text
        marginTop={(142 + top) / 3.5}
        font={'bold'}
        textAlign={'center'}
        color={COLORS.black}
        fontSize={18}>
        {'Tin Tức'}
      </Text>

      <Block flex marginTop={32} backgroundColor={COLORS.aliceBlue}>
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
              {'Nổi bật'}
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
              {'Tất Cả'}
            </Text>
            <Block
              radius={2}
              height={3}
              width={'80%'}
              backgroundColor={!isTab ? COLORS.primary : COLORS.aliceBlue}
            />
          </Pressable>
        </Block>
        <Block paddingHorizontal={16} paddingBottom={85} paddingTop={20} flex>
          {isTab ? <New /> : <All />}
        </Block>
      </Block>
    </Block>
  );
}
