import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {Block, HeaderTitleNoBackground, Pressable, Text} from 'components';
import {RootStackNavigationProps} from 'navigation';
import React from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';

type ScreenProps = StaticScreenProps<{stt: string | number}>;
const WarrantyInformationScreen = ({route}: ScreenProps) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const {bottom} = useSafeAreaInsets();
  const routeScreen = route.params.stt;

  const uiHaveWarranty = () => {
    return (
      <Block marginTop={25} radius={12} padding={16} backgroundColor={COLORS.aliceBlue}>
        <Text lineHeight={26} color={COLORS.primary} fontSize={16} font={'extraBold'}>
          {'THÔNG TIN KHÁCH HÀNG'}
        </Text>
        <Text marginTop={20} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Họ và Tên:'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {'Nguyễn văn A'}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Địa Chỉ'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {'Building 59 chế lan viên P.Tây Thạnh, Q.Tân Phú, TPHCM'}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Số Điện Thoại'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {'0902456876'}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Ngày Kích Hoạt'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {'22/05/2024'}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Thời Gian Bảo Hành'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.americanYellow}>
          {'từ 22/01/2024 - 22/05/2025'}
        </Text>
      </Block>
    );
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      <HeaderTitleNoBackground title="Thông Tin Bảo Hành" canGoBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          backgroundColor={COLORS.white}
          paddingBottom={bottom + 40}
          paddingHorizontal={16}
          justifyContent={'center'}
          flex>
          <Block alignSelf={'center'} padding={12}>
            <Text lineHeight={26} color={COLORS.primary} fontSize={16} font={'extraBold'}>
              {'KÍCH HOẠT BÁN HÀNG - KÍCH HOẠT BẢO HÀNH'}
            </Text>
            <Block marginTop={20} row justifyContent={'space-between'}>
              <Text fontSize={15} font={'bold'} color={COLORS.black}>
                {'Tên Model'}
              </Text>
              <Text fontSize={15} font={'regular'} color={COLORS.black}>
                {'MD123456'}
              </Text>
            </Block>
            <Block marginTop={15} row justifyContent={'space-between'}>
              <Text fontSize={15} font={'bold'} color={COLORS.black}>
                {'SERI'}
              </Text>
              <Text fontSize={15} font={'regular'} color={COLORS.black}>
                {'123133121'}
              </Text>
            </Block>
            <Block marginTop={15} row justifyContent={'space-between'}>
              <Text fontSize={15} font={'bold'} color={COLORS.black}>
                {'Năm Sản Xuất'}
              </Text>
              <Text fontSize={15} font={'regular'} color={COLORS.black}>
                {'2025'}
              </Text>
            </Block>
          </Block>
          {routeScreen ? (
            uiHaveWarranty()
          ) : (
            <Block paddingHorizontal={16} flex>
              <Text textAlign={'left'} color={COLORS.red} font={'bold'} fontSize={15}>
                {'Đã Quá Thời Gian Kích Hoạt Bảo Hành'}
              </Text>
            </Block>
          )}
        </Block>
      </ScrollView>
      <Pressable
        marginBottom={bottom + 10}
        height={44}
        marginTop={20}
        marginHorizontal={16}
        width={'95%'}
        backgroundColor={COLORS.primary}
        alignSelf={'center'}
        radius={40}
        justifyContent={'center'}
        alignItems={'center'}
        onPress={() => {
          navigation.popTo('BottomTabMain', {
            screen: 'Home',
          });
        }}>
        <Text fontSize={16} font={'semiBold'} color={COLORS.white}>
          {'Trang Chủ'}
        </Text>
      </Pressable>
    </Block>
  );
};

export default WarrantyInformationScreen;
