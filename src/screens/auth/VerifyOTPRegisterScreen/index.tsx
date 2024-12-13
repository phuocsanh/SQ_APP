import React, {useEffect, useRef, useState} from 'react';
import {Block, Button, HeaderTitle, Image, Pressable, Text} from 'components';
import {IMAGES} from 'assets';
import {COLORS, height} from 'theme';
import {Keyboard} from 'react-native';
import {Pressable as PressableRN} from 'react-native';
import {navigationRef} from 'navigation/navigationRef';
import {showToast} from 'components/common/CustomToast';
import {OtpInput, OtpInputRef} from 'react-native-otp-entry';
import {useVerifyOTPRegister} from 'queries/auth';
import {StaticScreenProps} from '@react-navigation/native';

type ScreenProps = StaticScreenProps<{email: string}>;
const VerifyOTPRegisterScreen = ({route}: ScreenProps) => {
  const [otp, setOtp] = useState('');
  const {error, isPending, mutate} = useVerifyOTPRegister();

  const refOTP = useRef<OtpInputRef>(null);
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

  const onSubmit = () => {
    if (!route.params.email) {
      return;
    }
    if (!otp) {
      return;
    }
    mutate(
      {
        verify_key: route.params.email,
        verify_code: otp,
      },
      {
        onSuccess: data => {
          if (data.data.token) {
            showToast({
              visibilityTime: 2000,
              type: 'success',
              text1: 'Xác thực otp thành công!',
            });
            navigationRef.navigate('CreatePassRegister', {token_user: data.data.token});
          } else {
            showToast({
              type: 'error',
              visibilityTime: 2000,
              text1: 'Có lỗi!',
              text2: 'Không có token!',
            });
          }
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
        Xác Thực OTP
      </Text>
      <Block marginHorizontal={15} marginTop={20}>
        <OtpInput
          ref={refOTP}
          numberOfDigits={6}
          focusColor={COLORS.primary}
          autoFocus={false}
          hideStick={true}
          placeholder="******"
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={text => setOtp(text)}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
        />
        <Block width={'100%'} marginTop={20} justifyContent="flex-end" alignItems="flex-end">
          <Pressable
            width={50}
            alignItems="flex-end"
            justifyContent="flex-end"
            onPress={() => refOTP.current?.clear()}>
            <Text>Xóa</Text>
          </Pressable>
        </Block>

        <Button
          marginTop={25}
          title="Gửi"
          height={44}
          onPress={onSubmit}
          disabled={isPending}
          loading={isPending}
        />
      </Block>
    </PressableRN>
  );
};

export default VerifyOTPRegisterScreen;
