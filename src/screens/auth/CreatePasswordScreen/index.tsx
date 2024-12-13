import {Block, Button, FormInput, HeaderTitle, Image, Text} from 'components';
import {showToast} from 'components/common/CustomToast';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import {COLORS, height} from 'theme';
import formConfig, {TypeRegisterPass} from './formConfig';
import {IMAGES} from 'assets';
import {useCreatePassRegister} from 'queries/auth';
import {StaticScreenProps} from '@react-navigation/native';
import {navigationRef} from 'navigation/navigationRef';
type ScreenProps = StaticScreenProps<{token_user: string}>;

const CreatePasswordScreen = ({route}: ScreenProps) => {
  const {control, handleSubmit, setValue} = useForm<TypeRegisterPass>(formConfig);
  const {isPending, mutate, isSuccess, error} = useCreatePassRegister();

  useEffect(() => {
    if (isSuccess) {
      setValue('password', '');
      setValue('confirm_password', '');
      showToast({
        type: 'success',
        text1: 'Thành công',
        text2: 'Tạo khẩu thành công!',
      });
      navigationRef.navigate('Login');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        text1: 'Có lỗi!',
        text2: error.response?.data.message || 'Vui lòng thử lại!',
      });
    }
  }, [error]);

  const onSubmit = async (value: TypeRegisterPass) => {
    mutate({user_token: route.params.token_user, user_password: value.password});
  };

  return (
    <Block style={{backgroundColor: COLORS.white, flex: 1}}>
      <HeaderTitle />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Image
              marginTop={height * 0.1}
              alignSelf="center"
              source={IMAGES.img_logo_asher}
              width={232}
              height={50}
            />
            <Text textAlign="center" marginTop={16} font="bold" fontSize={20} color={COLORS.black}>
              Tạo Mật Khẩu
            </Text>
            <Block marginHorizontal={15}>
              <FormInput
                maxLength={16}
                toggleHiddenPassword
                inputContainerProps={{
                  borderBottomColor: COLORS.chineseSilver,
                  borderWidth: 1,
                  radius: 8,
                  height: 45,
                  marginTop: 30,
                }}
                name={'password'}
                placeholder={'Nhập Mật Khẩu'}
                control={control}
              />
              <FormInput
                maxLength={16}
                toggleHiddenPassword
                inputContainerProps={{
                  borderBottomColor: COLORS.chineseSilver,
                  borderWidth: 1,
                  radius: 8,
                  height: 45,
                  marginTop: 30,
                }}
                name={'confirm_password'}
                placeholder={'Nhập Lại Mật Khẩu'}
                control={control}
              />
            </Block>

            <Button
              marginHorizontal={15}
              marginTop={25}
              title="Xác nhận"
              height={44}
              disabled={isPending}
              loading={isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default CreatePasswordScreen;
