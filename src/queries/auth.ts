import {useMutation} from '@tanstack/react-query';
import {ApiResponse, ResponseData} from 'models/common';
import {useAppStore} from 'stores';
import api from 'util/api';
import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
      password_confirm,
    }: {
      username: string;
      password: string;
      password_confirm: string;
    }) => {
      const rand = Math.floor(Math.random() * 10000);
      const res = await api.postRaw<ApiResponse>('/user/signup', {
        username,
        password,
        password_confirm,
        full_name: `Asher ${rand}`,
        email: `example${rand}@example.com`,
        gender: 1,
        province: '13000',
        district: '13113',
        ward: '9252',
        address: 'HCM',
        device_name: 'iDroid 20 Ultra Super Pro Max Deluxe',
        device_token: 'token123456789',
      });
      return res;
    },
  });
};
export const useResetPass = () => {
  return useMutation({
    mutationFn: async ({email}: {email: string}) => {
      const res = await api.postRaw<ApiResponse>('/user/reset-password', {email});
      return res;
    },
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.post<ApiResponse>('user/logout');
      return res;
    },
    onSettled: () => {
      useAppStore.setState({userToken: undefined});
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (body: {username: string; password: string; isSaveAccount: boolean}) => {
      const device_token = await messaging().getToken();
      const res = await api.postRaw<ResponseData<{access_token: string}>>('/user/login', {
        ...body,
        device_token,
        device_name: Device.deviceName || 'unknown',
      });

      if (res.data.access_token) {
        useAppStore.setState({userToken: res.data.access_token});
      }
      return res;
    },
    onSuccess: (_, body) => {
      useAppStore.setState({
        accountSaved: {phone: body.username, password: body.password},
        saveAccount: body.isSaveAccount,
      });
    },
  });
};
