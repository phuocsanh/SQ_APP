import React, {useEffect, useState} from 'react';
import {
  Block,
  Button,
  CheckBox,
  FormInput,
  HeaderTitle,
  Image,
  Pressable,
  Text,
  TextInput,
} from 'components';
import {IMAGES} from 'assets';
import {COLORS, height} from 'theme';
import {useForm} from 'react-hook-form';
import {Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import {navigationRef} from 'navigation/navigationRef';
import {useLogin} from 'queries/auth';
import formConfig, {FormField} from './formConfig';
import {showToast} from 'components/common/CustomToast';
import {useAppStore} from 'stores';
import {displayVersion} from 'util/helper';

const LoginScreen = () => {
  const {control, handleSubmit, setValue} = useForm<FormField>(formConfig);
  const [isFocusedPhoneInput, setIsFocusedPhoneInput] = useState(false);
  const [isFocusedPassInput, setIsFocusedPassInput] = useState(false);
  const {mutate, isPending, error} = useLogin();
  const saveAccount = useAppStore(state => state.saveAccount);
  const accountSaved = useAppStore(state => state.accountSaved);
  const [isSaved, setIsSaved] = useState(!!saveAccount && !!accountSaved);

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        text1: 'Có lỗi!',
        text2: error.response?.data.message || 'Vui lòng thử lại!',
      });
    }
  }, [error]);

  useEffect(() => {
    if (accountSaved && saveAccount) {
      setValue('phone', accountSaved.phone);
      setValue('password', accountSaved.password);
    }
  }, [accountSaved, saveAccount]);

  const onSubmit = async (value: FormField) => {
    mutate({
      username: value.phone,
      password: value.password,
      isSaveAccount: !!isSaved,
    });
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
              Đăng nhập
            </Text>
            <Block marginHorizontal={15} marginTop={20}>
              <FormInput
                control={control}
                name="phone"
                renderInput={({value, onChangeText}) => {
                  return (
                    <Block
                      borderColor={isFocusedPhoneInput ? COLORS.primary : COLORS.chineseSilver}
                      borderWidth={1}
                      height={42}
                      radius={8}>
                      {isFocusedPhoneInput && (
                        <Block
                          paddingHorizontal={3}
                          top={-10}
                          left={2}
                          position="absolute"
                          backgroundColor={COLORS.white}>
                          <Text fontSize={13} font="bold" color={COLORS.primary}>
                            Số Điện Thoại
                          </Text>
                        </Block>
                      )}
                      <TextInput
                        autoFocus={true}
                        maxLength={15}
                        flex
                        placeholder={isFocusedPhoneInput ? '' : 'Số Điện Thoại'}
                        keyboardType="number-pad"
                        onFocus={() => setIsFocusedPhoneInput(true)}
                        onBlur={() => setIsFocusedPhoneInput(false)}
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
              <Block marginTop={16}>
                <FormInput
                  control={control}
                  name="password"
                  renderInput={({value, onChangeText}) => {
                    return (
                      <Block
                        borderColor={isFocusedPassInput ? COLORS.primary : COLORS.chineseSilver}
                        borderWidth={1}
                        height={42}
                        radius={8}>
                        {isFocusedPassInput && (
                          <Block
                            paddingHorizontal={3}
                            top={-10}
                            left={2}
                            position="absolute"
                            backgroundColor={COLORS.white}>
                            <Text fontSize={13} font="bold" color={COLORS.primary}>
                              Mật Khẩu
                            </Text>
                          </Block>
                        )}
                        <TextInput
                          flex
                          placeholder={isFocusedPassInput ? '' : 'Mật Khẩu'}
                          onFocus={() => setIsFocusedPassInput(true)}
                          onBlur={() => setIsFocusedPassInput(false)}
                          value={value}
                          paddingHorizontal={12}
                          onChangeText={onChangeText}
                          placeholderTextColor={COLORS.gray}
                          clearButtonMode="always"
                          secureTextEntry
                        />
                      </Block>
                    );
                  }}
                />
              </Block>
              <Block marginTop={16}>
                <Block rowCenter justifyContent="space-between">
                  <Pressable
                    rowCenter
                    onPress={() => {
                      setIsSaved(!isSaved);
                    }}>
                    <CheckBox size={15} disabled isCheck={isSaved} activeColor={COLORS.primary} />

                    <Text fontSize={14} marginLeft={5} color={COLORS.gray}>
                      Lưu Mật Khẩu
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => navigationRef.navigate('ForgetPassword')}>
                    <Text fontSize={14} color={COLORS.primary}>
                      Quên Mật Khẩu
                    </Text>
                  </Pressable>
                </Block>
              </Block>

              <Button
                marginTop={25}
                title="Đăng nhập"
                height={44}
                disabled={isPending}
                loading={isPending}
                onPress={handleSubmit(onSubmit)}
              />
              <Block marginTop={15} rowCenter contentCenter>
                <Text color={COLORS.black} fontSize={15}>
                  Bạn Chưa Có Tài Khoản?{' '}
                  <Text
                    onPress={() => {
                      navigationRef.navigate('Register');
                    }}
                    color={COLORS.primary}>
                    Tạo Tài Khoản
                  </Text>
                </Text>
              </Block>
              <Text fontSize={10} textAlign="center" marginTop={3}>
                {displayVersion()}
              </Text>
            </Block>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default LoginScreen;
