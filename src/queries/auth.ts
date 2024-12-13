import {useMutation} from '@tanstack/react-query';
import {ApiResponse, ResponseData} from 'models/common';
import {useAppStore} from 'stores';
import api from 'util/api';
import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import {queryClient} from 'queries';

export const useCreatePassRegister = () => {
  return useMutation({
    mutationFn: async ({
      user_token,
      user_password,
    }: {
      user_token: string;
      user_password: string;
    }) => {
      const res = await api.postRaw<ApiResponse>('/auth/updatePassRegister', {
        user_token,
        user_password,
      });
      return res;
    },
  });
};
export const useVerifyOTPRegister = () => {
  return useMutation({
    mutationFn: async ({verify_key, verify_code}: {verify_key: string; verify_code: string}) => {
      const res = await api.postRaw<ResponseData<{token: string}>>('/auth/verifyOtp', {
        verify_key,
        verify_code,
      });
      return res;
    },
  });
};
export const useRegisterEmail = () => {
  return useMutation({
    mutationFn: async ({email}: {email: string}) => {
      const res = await api.postRaw<ApiResponse>('/auth/registerEmail', {
        email,
      });
      return res;
    },
  });
};
export const useResetPass = () => {
  return useMutation({
    mutationFn: async ({email}: {email: string}) => {
      const res = await api.postRaw<ResponseData<{timeCountDown: number}>>('/auth/forgetPassword', {
        email,
      });
      return res;
    },
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.post<ApiResponse>('auth/logout');
      return res;
    },
    onSettled: () => {
      useAppStore.setState({accessToken: undefined, refeshToken: undefined, userId: undefined});
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (body: {email: string; password: string; isSaveAccount: boolean}) => {
      const device_token = await messaging().getToken();
      const res = await api.postRaw<
        ResponseData<{
          user: {email: string; name: string; _id: string};
          tokens: {accessToken: string; refreshToken: string};
        }>
      >('/auth/login', {
        ...body,
        device_token,
        device_name: Device.deviceName || 'unknown',
      });

      if (res.code === 200 && res.data.tokens.accessToken) {
        useAppStore.setState({
          accessToken: res.data.tokens.accessToken,
          refeshToken: res.data.tokens.refreshToken,
          userId: res.data.user._id,
        });

        queryClient.refetchQueries({
          queryKey: ['getUserInfo', res.data.tokens.accessToken],
          type: 'active',
          exact: true,
        });
      }
      return res;
    },
    onSuccess: (_, body) => {
      useAppStore.setState({
        accountSaved: {email: body.email, password: body.password},
        saveAccount: body.isSaveAccount,
      });
    },
  });
};
