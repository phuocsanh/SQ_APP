import {useNavigation} from '@react-navigation/native';
import {ICONS} from 'assets';
import {Block, Image, Pressable, Text} from 'components';
import {RootStackNavigationProps} from 'navigation';
import {navigationRef} from 'navigation/navigationRef';
import React from 'react';
import {COLORS} from 'theme';

export default function WarrantyActivationSuccessfulScreen() {
  const navigation = useNavigation<RootStackNavigationProps>();

  return (
    <Block flex backgroundColor={COLORS.white}>
      <Block backgroundColor={COLORS.white} alignItems={'center'} justifyContent={'center'} flex>
        <Image source={ICONS.ic_warranty_successful} height={116} width={116} />
        <Text marginTop={32} fontSize={30} font={'bold'} color={COLORS.black}>
          {'Thành Công!'}
        </Text>
        <Text marginTop={20} fontSize={16} font={'semiBold'} color={COLORS.black}>
          {'Bạn đã kích hoạt bảo hành'}
        </Text>
        <Pressable
          height={44}
          marginTop={20}
          marginHorizontal={16}
          width={'95%'}
          backgroundColor={COLORS.primary}
          radius={40}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={() => {
            navigationRef.navigate('WarrantyInformation', {
              stt: 1,
            });
          }}>
          <Text fontSize={16} font={'semiBold'} color={COLORS.white}>
            {'Xem Chi Tiết'}
          </Text>
        </Pressable>
        <Pressable
          height={44}
          marginTop={20}
          marginHorizontal={16}
          width={'95%'}
          borderWidth={1}
          borderColor={COLORS.primary}
          radius={40}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={() => {
            navigation.popTo('BottomTabMain', {
              screen: 'Home',
            });
          }}>
          <Text fontSize={16} font={'semiBold'} color={COLORS.primary}>
            {'Trang Chủ'}
          </Text>
        </Pressable>
      </Block>
    </Block>
  );
}
