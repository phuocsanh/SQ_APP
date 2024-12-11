import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {ICONS} from 'assets';
import {Block, HeaderTitle, Image, Pressable, Text} from 'components';
import {ActiveType} from 'models/other';
import {ProductInfo} from 'models/products';
import {RootStackNavigationProps} from 'navigation';
import {useActiveProducts} from 'queries/product';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS, vs} from 'theme';
import {FormField} from 'screens/common/WarrantyActivationScreen/formConfig';

type ScreenProps = StaticScreenProps<{
  data: ProductInfo[];
  type: ActiveType;
  /**
   * Chỉ xem trạng thái, không kích hoạt
   */
  isViewOnly?: boolean;
  customerInfo?: FormField;
}>;

export default function ActiveResultScreen({route}: ScreenProps) {
  const {data, type, isViewOnly, customerInfo} = route.params;
  const isActivedBefore = !!data[0]?.warrantied_at;
  const navigation = useNavigation<RootStackNavigationProps>();
  const activeProduct = useActiveProducts();
  const activeSuccessCount = activeProduct.data?.error?.length
    ? `(${data.length - activeProduct.data.error.length}/${data.length}) sản phẩm`
    : '';

  useEffect(() => {
    if (!isViewOnly) {
      if (type === ActiveType.SALE) {
        activeProduct.mutate({codes: data.map(x => x.qrcode), type});
      } else if (customerInfo) {
        activeProduct.mutate({
          codes: data.map(x => x.qrcode),
          type,
          customer_address: customerInfo.address,
          customer_district: customerInfo.district,
          customer_email: customerInfo.email,
          customer_name: customerInfo.name,
          customer_phone: customerInfo.phone,
          customer_province: customerInfo.province,
        });
      }
    }
  }, [isViewOnly]);

  const renderStatus = () => {
    return (
      <>
        <Block flex />
        <Block alignItems="center">
          <Image
            source={isActivedBefore ? ICONS.ic_warrantySuccess : ICONS.ic_warrantyErr}
            width={178}
            height={141}
            contentFit="contain"
          />
          <Text fontSize={30} font="bold" marginTop={vs(30)}>
            {isActivedBefore ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
          </Text>
          <Text font="semiBold" fontSize={16} marginTop={vs(20)}>
            {isActivedBefore
              ? 'Sản phẩm đã được kích hoạt bảo hành'
              : 'Sản phẩm chưa được kích hoạt bảo hành'}
          </Text>
          {isActivedBefore && data.length === 1 && (
            <Pressable
              onPress={() => navigation.replace('ActiveStatus', {qrCode: data[0]?.qrcode || ''})}
              borderWidth={1}
              borderColor={COLORS.primary}
              backgroundColor={COLORS.primary}
              radius={40}
              alignSelf="stretch"
              marginHorizontal={67}
              alignItems="center"
              padding={11}
              marginTop={vs(30)}>
              <Text color={COLORS.white}>{'Xem chi tiết'}</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => navigation.popTo('BottomTabMain')}
            borderWidth={1}
            borderColor={COLORS.primary}
            backgroundColor={COLORS.white}
            radius={40}
            alignSelf="stretch"
            marginHorizontal={67}
            alignItems="center"
            padding={11}
            marginTop={vs(15)}>
            <Text color={COLORS.primary}>{'Trang chủ'}</Text>
          </Pressable>
        </Block>
        <Block flex />
      </>
    );
  };

  const renderResult = () => {
    if (activeProduct.isPending) {
      return (
        <Block absoluteFillObject contentCenter backgroundColor={COLORS.blackTransparent20}>
          <ActivityIndicator size={'large'} color={COLORS.white} />
        </Block>
      );
    }
    if (activeProduct.isError || activeProduct.data?.error?.length === data.length) {
      return (
        <Block flex contentCenter>
          <Image contentFit="contain" source={ICONS.ic_warrantyErr} width={178} height={141} />
          <Text fontSize={30} font="bold" marginTop={vs(30)}>
            {'Thất bại'}
          </Text>
          <Text font="semiBold" fontSize={16} marginTop={vs(20)}>
            {'Kích hoạt sản phẩm không thành công'}
          </Text>
          <Pressable
            onPress={() => navigation.popTo('BottomTabMain')}
            borderWidth={1}
            borderColor={COLORS.primary}
            backgroundColor={COLORS.white}
            radius={40}
            alignSelf="stretch"
            marginHorizontal={67}
            alignItems="center"
            padding={11}
            marginTop={vs(15)}>
            <Text color={COLORS.primary}>{'Trang chủ'}</Text>
          </Pressable>
        </Block>
      );
    }
    return (
      <>
        <Block flex>
          {activeProduct.data?.note ? (
            <Block
              marginHorizontal={16}
              backgroundColor={COLORS.ghostWhite1}
              radius={12}
              padding={12}
              paddingTop={26}>
              <Text font="bold" fontSize={15}>
                {activeProduct.data.note.title}
              </Text>
              <Text marginTop={8} lineHeight={18}>
                {activeProduct.data.note.content}
              </Text>
              <Block rowCenter marginTop={8}>
                <Text font="bold" fontSize={16}>
                  {'+'}
                </Text>
                <Image marginLeft={5} contentFit="contain" source={ICONS.ic_point} square={16} />
                <Text color={COLORS.primary} marginLeft={5} font="bold" fontSize={16}>
                  {activeProduct.data.note.point}
                </Text>
                <Text marginLeft={5} font="bold" fontSize={16}>
                  {'Point'}
                </Text>
              </Block>
            </Block>
          ) : null}
        </Block>
        <Block alignItems="center">
          <Image
            source={
              type === ActiveType.WARRANTY ? ICONS.ic_warranty_successful : ICONS.ic_bag_success
            }
            width={178}
            height={141}
          />
          <Text fontSize={30} font="bold" marginTop={vs(30)}>
            {'Thành công'}
          </Text>
          <Text font="semiBold" fontSize={16} marginTop={vs(20)}>
            {`Bạn đã kích hoạt ${type === ActiveType.WARRANTY ? 'bảo hành' : 'bán hàng'} ${activeSuccessCount}`}
          </Text>
          {data.length === 1 && (
            <Pressable
              onPress={() => navigation.replace('ActiveStatus', {qrCode: data[0]?.qrcode || ''})}
              borderWidth={1}
              borderColor={COLORS.primary}
              backgroundColor={COLORS.primary}
              radius={40}
              alignSelf="stretch"
              marginHorizontal={67}
              alignItems="center"
              padding={11}
              marginTop={vs(30)}>
              <Text color={COLORS.white}>{'Xem chi tiết'}</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => navigation.popTo('BottomTabMain')}
            borderWidth={1}
            borderColor={COLORS.primary}
            backgroundColor={COLORS.white}
            radius={40}
            alignSelf="stretch"
            marginHorizontal={67}
            alignItems="center"
            padding={11}
            marginTop={vs(15)}>
            <Text color={COLORS.primary}>{'Trang chủ'}</Text>
          </Pressable>
        </Block>
        <Block flex />
      </>
    );
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      <HeaderTitle />
      {isViewOnly ? renderStatus() : renderResult()}
    </Block>
  );
}
