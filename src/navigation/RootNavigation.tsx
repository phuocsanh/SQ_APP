import {createStaticNavigation, StaticParamList} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useIsSignedOut} from 'hooks/CheckLogin';
import useNotificationListener from 'hooks/useNotificationListener';
import React from 'react';
import auth from 'screens/auth';
import common from 'screens/common';
import {useAppStore} from 'stores';
import BottomTabMain from './BottomTabMain';
import {navigationRef} from './navigationRef';

const RootStack = createNativeStackNavigator({
  screenOptions: {headerShown: false},
  screens: {
    BottomTabMain,
    NewsDetail: common.NewsDetailScreen,
    PointHistory: common.PointHistoryScreen,
    ProductDetail: common.ProductDetailScreen,
    Detail: common.DetailScreen,
    NotificationDetail: common.NotificationDetailScreen,
    Notification: common.NotificationScreen,
    LookUpWarranty: common.LookUpWarrantyScreen,
    ActivationHistory: common.ActivationHistoryScreen,
    ChangePassword: common.ChangePasswordScreen,
    WarrantyInformation: common.WarrantyInformationScreen,
    ScanQr: common.ScanQrScreen,
    WarrantyActivationSuccessful: common.WarrantyActivationSuccessfulScreen,
    WarrantyActivation: common.WarrantyActivationScreen,
    ActiveResult: common.ActiveResultScreen,
    ActiveStatus: common.ActiveStatusScreen,
    ListActiveProduct: common.ListActiveProductScreen,
    SearchNewsBottom: common.SearchNewsBottomScreen,
    DeleteAccount: common.DeleteAccountScreen,
  },
  groups: {
    Auth: {
      if: useIsSignedOut,
      screens: {
        Login: auth.LoginScreen,
        Register: auth.RegisterScreen,
        ForgetPassword: auth.ForgetPasswordScreen,
      },
    },
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Navigation = createStaticNavigation(RootStack);

export const RootNavigation = () => {
  useNotificationListener();
  return (
    <Navigation ref={navigationRef} onReady={() => useAppStore.setState({navigationReady: true})} />
  );
};