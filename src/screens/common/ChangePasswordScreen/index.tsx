import {Block, FormInput, HeaderTitleNoBackground, Loading, Pressable, Text} from 'components';
import {showToast} from 'components/common/CustomToast';
import {useUpdatePassword} from 'queries/profile';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {COLORS} from 'theme';
import formConfig, {TypeChangePass} from './formConfig';

const ChangePasswordScreen = () => {
  const {control, handleSubmit, setValue} = useForm<TypeChangePass>(formConfig);
  const {data, isPending, mutate, isSuccess, error} = useUpdatePassword();

  useEffect(() => {
    if (isSuccess) {
      setValue('password', '');
      setValue('password_old', '');
      setValue('rePassword', '');
      showToast({
        type: 'success',
        text1: 'Thành công',
        text2: data.message || 'Cập nhật mật khẩu thành công',
      });
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

  const handleSuccess = async (data: TypeChangePass) => {
    const body = {
      password_old: data.password_old,
      password: data.password,
    };

    mutate(body);
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      {isPending && <Loading />}
      <HeaderTitleNoBackground title="Đổi Mật Khẩu" canGoBack />
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}>
        <Block flex paddingTop={83} paddingHorizontal={16}>
          <FormInput
            autoFocus={true}
            maxLength={15}
            toggleHiddenPassword
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 45,
            }}
            name={'password_old'}
            placeholder={'Mật Khẩu'}
            control={control}
          />
          <FormInput
            maxLength={15}
            toggleHiddenPassword
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 45,
              marginTop: 30,
            }}
            name={'password'}
            placeholder={'Nhập Mật Khẩu Mới'}
            control={control}
          />
          <FormInput
            maxLength={15}
            toggleHiddenPassword
            inputContainerProps={{
              borderBottomColor: COLORS.chineseSilver,
              borderWidth: 1,
              radius: 8,
              height: 45,
              marginTop: 30,
            }}
            name={'rePassword'}
            placeholder={'Nhập Lại Mật Khẩu'}
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
              {'Lưu Mật Khẩu'}
            </Text>
          </Pressable>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default ChangePasswordScreen;
