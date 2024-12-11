import React, {useEffect, useState} from 'react';
import {Block, Button, FormInput, HeaderTitle, Text, TextInput} from 'components';
import {COLORS, height} from 'theme';
import {useForm} from 'react-hook-form';
import {Alert, Keyboard} from 'react-native';
import {Pressable as PressableRN} from 'react-native';
import {navigationRef} from 'navigation/navigationRef';
import formConfig, {ForgetPass} from './formConfig';
import {useResetPass} from 'queries/auth';
import {showToast} from 'components/common/CustomToast';
const ForgetPasswordScreen = () => {
  const {control, handleSubmit} = useForm<ForgetPass>(formConfig);
  const [isFocusedEmailInput, setIsFocusedEmailInput] = useState(false);
  const {mutate, isPending, isSuccess, error} = useResetPass();

  useEffect(() => {
    if (isSuccess) {
      Alert.alert('Thành công', 'Mật khẩu được gửi về email. Vui lòng kiểm tra email của bạn!', [
        {
          text: 'Xác nhận',
          onPress: () => {
            navigationRef.navigate('Login');
          },
        },
      ]);
    }
    if (error) {
      showToast({
        type: 'error',
        text1: 'Có lỗi!',
        text2: error.response?.data.message || 'Vui lòng thử lại!',
      });
    }
  }, [isSuccess, error]);

  const onSubmit = (value: ForgetPass) => {
    mutate({email: value.email});
  };
  return (
    <PressableRN
      style={{flex: 1, backgroundColor: COLORS.white}}
      onPress={() => Keyboard.dismiss()}>
      <HeaderTitle />

      <Text
        textAlign="center"
        marginTop={height / 6}
        font="bold"
        fontSize={20}
        color={COLORS.black}>
        Quên mật khẩu
      </Text>
      <Block marginHorizontal={15} marginTop={20}>
        <FormInput
          control={control}
          name="email"
          renderInput={({value, onChangeText}) => {
            return (
              <Block
                borderColor={isFocusedEmailInput ? COLORS.primary : COLORS.chineseSilver}
                borderWidth={1}
                height={42}
                radius={8}>
                {isFocusedEmailInput && (
                  <Block
                    paddingHorizontal={3}
                    top={-10}
                    left={2}
                    position="absolute"
                    backgroundColor={COLORS.white}>
                    <Text fontSize={13} font="bold" color={COLORS.primary}>
                      Email
                    </Text>
                  </Block>
                )}
                <TextInput
                  flex
                  placeholder={isFocusedEmailInput ? '' : 'Email'}
                  onFocus={() => setIsFocusedEmailInput(true)}
                  onBlur={() => setIsFocusedEmailInput(false)}
                  value={value}
                  paddingHorizontal={12}
                  onChangeText={onChangeText}
                  placeholderTextColor={COLORS.gray}
                  clearButtonMode="always"
                />
              </Block>
            );
          }}
        />

        <Button
          marginTop={25}
          title="Gửi"
          height={44}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          loading={isPending}
        />
      </Block>
    </PressableRN>
  );
};

export default ForgetPasswordScreen;
