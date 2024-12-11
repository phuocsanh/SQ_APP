import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {Block, FormInput, HeaderTitleNoBackground, Pressable, SelectInput, Text} from 'components';
import {ProductInfo} from 'models/products';
import {useQueryDistrict, useQueryProvince} from 'queries/other';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import formConfig, {FormField} from './formConfig';
import {RootStackNavigationProps} from 'navigation';
import {ActiveType} from 'models/other';

type ScreenProps = StaticScreenProps<{products: ProductInfo[]}>;

const WarrantyActivationScreen = ({route}: ScreenProps) => {
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProps>();
  const {products} = route.params;
  const firstProduct = products[0];
  const {control, handleSubmit, watch, setValue} = useForm<FormField>(formConfig);
  const selectedProvince = watch('province');

  const queryProvince = useQueryProvince();
  const queryDistrict = useQueryDistrict(selectedProvince);

  useEffect(() => {
    if (selectedProvince) {
      setValue('district', '');
    }
  }, [selectedProvince]);

  const handleSuccess = async (data: FormField) => {
    console.log(data);
    navigation.replace('ActiveResult', {
      data: products,
      type: ActiveType.WARRANTY,
      customerInfo: data,
    });
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      <HeaderTitleNoBackground title="Kích Hoạt Bảo Hành" canGoBack />
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}>
        {products.length === 1 && firstProduct ? (
          <Block padding={16} radius={12} backgroundColor={COLORS.water}>
            <Text fontSize={16} font={'bold'} color={COLORS.primary}>
              {'Thông Tin Sản Phẩm'}
            </Text>
            <Block marginTop={20} row justifyContent={'space-between'}>
              <Text fontSize={15} font={'bold'} color={COLORS.black}>
                {'Tên Model'}
              </Text>
              <Text fontSize={15} font={'regular'} color={COLORS.black}>
                {firstProduct.product.item_code}
              </Text>
            </Block>
            <Block marginTop={15} row justifyContent={'space-between'}>
              <Text fontSize={15} font={'bold'} color={COLORS.black}>
                {'SERI'}
              </Text>
              <Text fontSize={15} font={'regular'} color={COLORS.black}>
                {firstProduct.serial_code}
              </Text>
            </Block>
            <Block marginTop={15} row justifyContent={'space-between'}>
              <Text fontSize={15} font={'bold'} color={COLORS.black}>
                {'Năm Sản Xuất'}
              </Text>
              <Text fontSize={15} font={'regular'} color={COLORS.black}>
                {new Date(firstProduct.manufacture_at * 1000).getFullYear()}
              </Text>
            </Block>
          </Block>
        ) : (
          <Block padding={16} radius={12} backgroundColor={COLORS.water}>
            <Text fontSize={16} font={'bold'} color={COLORS.primary}>
              {`${products.length} sản phẩm`}
            </Text>
          </Block>
        )}
        <Block marginTop={30} paddingBottom={bottom + 30}>
          <Text fontSize={16} font={'bold'} color={COLORS.primary}>
            {'Thông Tin Khách Hàng'}
          </Text>
          <FormInput
            autoFocus={true}
            maxLength={50}
            height={42}
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 42,
              marginTop: 25,
            }}
            name={'name'}
            placeholder={'Họ Và Tên'}
            control={control}
          />
          <SelectInput
            inputProps={{
              marginTop: 20,
            }}
            placeholder={'Thành Phố/Tỉnh'}
            labelInput={'Thành Phố/Tỉnh'}
            control={control}
            name={'province'}
            data={queryProvince.data || []}
          />
          <SelectInput
            inputProps={{
              marginTop: 20,
            }}
            placeholder={'Quận/ Huyện'}
            labelInput={'Quận/ Huyện'}
            control={control}
            name={'district'}
            data={queryDistrict.data || []}
          />
          <FormInput
            maxLength={100}
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 42,
              marginTop: 20,
            }}
            name={'address'}
            placeholder={'Nhập Địa Chỉ'}
            control={control}
          />
          <FormInput
            maxLength={50}
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 42,
              marginTop: 20,
            }}
            name={'email'}
            placeholder={'Email'}
            control={control}
            keyboardType="email-address"
          />
          <FormInput
            maxLength={15}
            keyboardType={'phone-pad'}
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 42,
              marginTop: 20,
            }}
            name={'phone'}
            placeholder={'Nhập Số Điện Thoại'}
            control={control}
          />
          <Pressable
            marginTop={30}
            height={44}
            radius={40}
            alignItems={'center'}
            backgroundColor={COLORS.primary}
            justifyContent={'center'}
            onPress={handleSubmit(handleSuccess)}>
            <Text color={COLORS.white} font={'semiBold'} fontSize={16}>
              {'Kích Hoạt'}
            </Text>
          </Pressable>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default WarrantyActivationScreen;
