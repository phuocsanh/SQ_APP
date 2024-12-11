import {IMAGES} from 'assets';
import {Block, Icon, Image, Pressable, Text} from 'components';
import {StatusBar} from 'expo-status-bar';
import {navigationRef} from 'navigation/navigationRef';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import All from './components/All';
import New from './components/New';

export default function NewsScreen() {
  const {top} = useSafeAreaInsets();
  const [isTab, setIsTab] = useState(true);

  return (
    <Block flex backgroundColor={COLORS.white}>
      <Block position="absolute" width={'100%'}>
        <StatusBar />
        <Image height={162 + top} width={'100%'} source={IMAGES.img_bg_header} contentFit="fill" />
      </Block>
      <Text
        marginTop={(142 + top) / 3.5}
        font={'bold'}
        textAlign={'center'}
        color={COLORS.black}
        fontSize={18}>
        {'Tin Tức'}
      </Text>
      <Pressable
        marginTop={20}
        marginHorizontal={18}
        height={38}
        radius={20}
        paddingHorizontal={18}
        rowCenter
        backgroundColor={COLORS.white}
        onPress={() => {
          navigationRef.navigate('SearchNewsBottom');
        }}>
        <Icon name={'search1'} type={'AntDesign'} size={17} color={COLORS.sonicSilver} />
        <Text marginLeft={8} fontSize={14} font={'regular'} color={COLORS.sonicSilver}>
          {'Tìm kiếm tin tức...'}
        </Text>
      </Pressable>

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
