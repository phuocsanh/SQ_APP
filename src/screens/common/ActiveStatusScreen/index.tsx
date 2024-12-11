import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Block, HeaderTitle, Loading, Pressable, ScrollView, Text} from 'components';
import moment from 'moment';
import {RootStackNavigationProps} from 'navigation';
import {productInfoOption} from 'queries/product';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';

type ScreenProps = StaticScreenProps<{qrCode: string}>;
export default function ActiveStatusScreen({route}: ScreenProps) {
  const productInfo = useQuery(productInfoOption(route.params.qrCode));
  const navigation = useNavigation<RootStackNavigationProps>();
  const {bottom} = useSafeAreaInsets();

  const renderWarranty = () => {
    if (!productInfo.data?.warrantied_at) {
      return null;
    }
    return (
      <Block marginTop={25} radius={12} padding={16} backgroundColor={COLORS.aliceBlue}>
        <Text lineHeight={26} color={COLORS.primary} fontSize={16} font={'extraBold'}>
          {'THÔNG TIN KHÁCH HÀNG'}
        </Text>
        <Text marginTop={20} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Họ và Tên:'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {productInfo.data.customer_name}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Địa Chỉ'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {productInfo.data.customer_address}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Số Điện Thoại'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {productInfo.data.customer_phone}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Ngày Kích Hoạt'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.black}>
          {moment.unix(productInfo.data.warrantied_at).format('DD/MM/YYYY')}
        </Text>
        <Text marginTop={15} fontSize={15} font={'bold'} color={COLORS.black}>
          {'Thời Gian Bảo Hành'}
        </Text>
        <Text fontSize={15} marginTop={8} font={'regular'} color={COLORS.americanYellow}>
          {productInfo.data.warranty.warranty_range}
        </Text>
      </Block>
    );
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      <HeaderTitle title="Thông tin kích hoạt" shawdow={3} />
      {productInfo.isPending ? (
        <Loading />
      ) : productInfo.data ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 2}}>
            <Block
              backgroundColor={COLORS.white}
              paddingBottom={bottom + 40}
              paddingHorizontal={16}
              justifyContent={'center'}>
              <Block alignSelf={'center'} padding={12}>
                <Text lineHeight={26} color={COLORS.primary} fontSize={16} font={'extraBold'}>
                  {'KÍCH HOẠT BÁN HÀNG - KÍCH HOẠT BẢO HÀNH'}
                </Text>
                <Block marginTop={20} row justifyContent={'space-between'}>
                  <Text fontSize={15} font={'bold'} color={COLORS.black}>
                    {'Tên Model'}
                  </Text>
                  <Text fontSize={15} font={'regular'} color={COLORS.black}>
                    {productInfo.data.product.item_code}
                  </Text>
                </Block>
                <Block marginTop={15} row justifyContent={'space-between'}>
                  <Text fontSize={15} font={'bold'} color={COLORS.black}>
                    {'SERI'}
                  </Text>
                  <Text fontSize={15} font={'regular'} color={COLORS.black}>
                    {productInfo.data.serial_code}
                  </Text>
                </Block>
                <Block marginTop={15} row justifyContent={'space-between'}>
                  <Text fontSize={15} font={'bold'} color={COLORS.black}>
                    {'Năm Sản Xuất'}
                  </Text>
                  <Text fontSize={15} font={'regular'} color={COLORS.black}>
                    {new Date((productInfo.data.manufacture_at || 0) * 1000).getFullYear()}
                  </Text>
                </Block>
              </Block>
              {productInfo.data.warrantied_at ? renderWarranty() : null}
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
        </>
      ) : null}
    </Block>
  );
}
