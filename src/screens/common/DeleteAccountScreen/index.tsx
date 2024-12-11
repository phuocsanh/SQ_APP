import {Block, FormInput, HeaderTitleNoBackground, Loading, Pressable, Text} from 'components';
import {showToast} from 'components/common/CustomToast';
import {useDeleteAccount} from 'queries/profile';
import React from 'react';
import {useForm} from 'react-hook-form';
import {COLORS, height} from 'theme';
import {isAppAxiosError} from 'util/checkType';
import formConfig, {FormField} from './formConfig';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from 'navigation';

const DeleteAccountScreen = () => {
  const {control, handleSubmit} = useForm<FormField>(formConfig);
  const {isPending, mutateAsync} = useDeleteAccount();
  const navigation = useNavigation<RootStackNavigationProps>();

  const onDelete = (data: FormField) => {
    mutateAsync(data.password)
      .then(() => {
        navigation.popTo('BottomTabMain', {screen: 'Home'});
      })
      .catch(e => {
        let errorMessage = e.message || 'Có lỗi xảy ra!';
        if (isAppAxiosError(e)) {
          errorMessage = e.response?.data.message || 'Có lỗi xảy ra';
        }
        showToast({type: 'error', text1: 'Thất bại', text2: errorMessage});
      });
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      {isPending && <Loading />}
      <HeaderTitleNoBackground title="Xóa tài khoản" canGoBack />
      <Block flex paddingHorizontal={16}>
        <Text fontSize={20} color={COLORS.red} font="bold" marginTop={height * 0.2}>
          {'Thao tác không thể khôi phục. Vui lòng cân nhắc trước khi thực hiện!'}
        </Text>
        <FormInput
          autoFocus={true}
          maxLength={20}
          toggleHiddenPassword
          inputContainerProps={{
            borderBottomColor: COLORS.chineseSilver,
            borderWidth: 1,
            radius: 8,
            height: 45,
            marginTop: 25,
          }}
          name={'password'}
          placeholder={'Mật Khẩu'}
          control={control}
        />

        <Pressable
          marginTop={30}
          height={44}
          radius={40}
          alignItems={'center'}
          backgroundColor={COLORS.primary}
          justifyContent={'center'}
          onPress={handleSubmit(onDelete)}>
          <Text color={COLORS.white} font={'semiBold'} fontSize={16}>
            {'Xóa tài khoản'}
          </Text>
        </Pressable>
      </Block>
    </Block>
  );
};

export default DeleteAccountScreen;
