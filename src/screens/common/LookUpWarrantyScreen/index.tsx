import {ICONS} from 'assets';
import {Block, HeaderTitleNoBackground, Image, Pressable, Text} from 'components';
import {navigationRef} from 'navigation/navigationRef';
import React from 'react';
import {COLORS} from 'theme';

export default function LookUpWarrantyScreen() {
  const isCheckSuccess = 1;
  return (
    <Block flex backgroundColor={COLORS.white}>
      {!isCheckSuccess && <HeaderTitleNoBackground title="" canGoBack />}
      <Block backgroundColor={COLORS.white} alignItems={'center'} justifyContent={'center'} flex>
        {isCheckSuccess ? (
          <>
            <Image source={ICONS.ic_warrantySuccess} height={116} width={116} />
            <Text marginTop={32} fontSize={30} font={'bold'} color={COLORS.black}>
              {'Đã Kích Hoạt!'}
            </Text>
            <Text marginTop={20} fontSize={16} font={'semiBold'} color={COLORS.black}>
              {'Sản phẩm đã được kích hoạt bảo hành'}
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
                  stt: isCheckSuccess,
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
                navigationRef.goBack();
              }}>
              <Text fontSize={16} font={'semiBold'} color={COLORS.primary}>
                {'Trang Chủ'}
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Image source={ICONS.ic_warrantyErr} height={116} width={116} />
            <Text marginTop={32} fontSize={30} font={'bold'} color={COLORS.black}>
              {'Chưa Kích Hoạt!'}
            </Text>
            <Text marginTop={20} fontSize={16} font={'semiBold'} color={COLORS.black}>
              {'Sản phẩm chưa được kích hoạt bán hàng'}
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
                navigationRef.goBack();
              }}>
              <Text fontSize={16} font={'semiBold'} color={COLORS.white}>
                {'Trang Chủ'}
              </Text>
            </Pressable>
          </>
        )}
      </Block>
    </Block>
  );
}
