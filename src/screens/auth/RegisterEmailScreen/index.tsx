import React, {useEffect} from 'react';
import {Block, Button, FormInput, HeaderTitle, Image, Text} from 'components';
import {IMAGES} from 'assets';
import {COLORS, height} from 'theme';
import {useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {Pressable as PressableRN} from 'react-native';
import formConfig, {Register} from './formConfig';
import {navigationRef} from 'navigation/navigationRef';
import {showToast} from 'components/common/CustomToast';
import {useRegisterEmail} from 'queries/auth';
const RegisterScreen = () => {
  const {control, handleSubmit} = useForm<Register>(formConfig);
  const {mutate, error, isPending} = useRegisterEmail();

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        visibilityTime: 5000,
        text1: 'Có lỗi!',
        text2: error.response?.data.message || 'Vui lòng thử lại!',
      });
    }
  }, [error]);

  const onSubmit = (values: Register) => {
    mutate(
      {
        email: values.email,
      },
      {
        onSuccess: () => {
          showToast({
            visibilityTime: 5000,
            type: 'success',
            text1: 'Đăng kí email thành công!',
          });
          navigationRef.navigate('VerifyOTPRegister', {email: values.email});
        },
      },
    );
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
        Đăng Kí
      </Text>
      <Block marginHorizontal={15} marginTop={20}>
        <FormInput
          maxLength={80}
          inputContainerProps={{
            borderBottomColor: COLORS.chineseSilver,
            borderWidth: 1,
            radius: 8,
            height: 45,
          }}
          name={'email'}
          placeholder={'Email'}
          control={control}
        />

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
