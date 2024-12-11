import React, {useEffect} from 'react';
import {Block, Button, FormInput, HeaderTitle, Image, Text} from 'components';
import {IMAGES} from 'assets';
import {COLORS, height} from 'theme';
import {useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {Pressable as PressableRN} from 'react-native';
import formConfig, {Register} from './formConfig';
import {navigationRef} from 'navigation/navigationRef';
import {useRegister} from 'queries/auth';
import {showToast} from 'components/common/CustomToast';
const RegisterScreen = () => {
  const {control, handleSubmit} = useForm<Register>(formConfig);
  const {mutate, isSuccess, error, isPending} = useRegister();

  useEffect(() => {
    if (isSuccess) {
      showToast({
        visibilityTime: 5000,
        type: 'success',
        text1: 'Đăng kí thành công!',
      });
      navigationRef.navigate('Login');
    }
    if (error) {
      showToast({
        type: 'error',
        visibilityTime: 5000,
        text1: 'Có lỗi!',
        text2: error.response?.data.message || 'Vui lòng thử lại!',
      });
    }
  }, [isSuccess, error]);

  const onSubmit = (values: Register) => {
    mutate({
      username: values.phone,
      password: values.password,
      password_confirm: values.confirm_password,
    });
  };
  return (
    <PressableRN
      style={{flex: 1, backgroundColor: COLORS.white}}
      onPress={() => Keyboard.dismiss()}>
      <HeaderTitle />
      <Image
        marginTop={height / 8}
        alignSelf="center"
        source={IMAGES.img_logo_asher}
        width={232}
        height={50}
      />
      <Text textAlign="center" marginTop={16} font="bold" fontSize={20} color={COLORS.black}>
        Đăng kí
      </Text>
      <Block marginHorizontal={15} marginTop={20}>
        <FormInput
          maxLength={15}
          inputMode="numeric"
          inputContainerProps={{
            borderBottomColor: COLORS.chineseSilver,
            borderWidth: 1,
            radius: 8,
            height: 45,
          }}
          name={'phone'}
          placeholder={'Số điện thoại'}
          control={control}
        />
        <Block marginTop={16}>
          <FormInput
            maxLength={15}
            toggleHiddenPassword
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 45,
            }}
            name={'password'}
            placeholder={'Mật Khẩu'}
            control={control}
          />
        </Block>
        <Block marginTop={16}>
          <FormInput
            maxLength={15}
            toggleHiddenPassword
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 45,
            }}
            name={'confirm_password'}
            placeholder={'Xác Nhận Mật Khẩu'}
            control={control}
          />
        </Block>

        <Button
          marginTop={25}
          title="Đăng kí"
          height={44}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          loading={isPending}
        />
      </Block>
    </PressableRN>
  );
};

export default RegisterScreen;
