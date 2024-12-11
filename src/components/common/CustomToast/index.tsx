import React from 'react';
import Toast, {ToastConfigParams, ToastData, ToastOptions} from 'react-native-toast-message';
import {Block, Image, Pressable, Text} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rhs, width} from 'theme';
import {ICONS} from 'assets';

type Status = 'error' | 'success' | 'warning' | 'info';

const iconToast = {
  success: ICONS.ic_toastSuccessIcon,
  warning: ICONS.ic_toastWarningIcon,
  error: ICONS.ic_toastErrorIcon,
  info: ICONS.ic_toastInfoIcon,
};

const textColor = {
  success: '#1f8722',
  warning: '#f08135',
  error: '#d9100a',
  info: '#2A8EFE',
};

const bgIconToast = {
  success: '#def1d7',
  warning: '#fef7ec',
  error: '#fae1db',
  info: '#E0F3FF',
};

export type ToastMessageProps = {
  status: Status;
  action?: {title: string; onPress: () => void};
};

export type ToastProps = ToastData &
  Omit<ToastOptions, 'type' | 'props' | 'onPress' | 'onHide' | 'onShow'> & {
    type: Status;
    action?: {title?: string; onPress?: () => void};
  };

export const CustomToast = () => {
  const {top} = useSafeAreaInsets();
  return <Toast topOffset={top + 12} visibilityTime={4000} config={{ToastMessage}} />;
};

export const showToast = (toastProps: ToastProps) => {
  return Toast.show({
    ...toastProps,
    type: 'ToastMessage',
    props: {status: toastProps.type, action: toastProps.action},
  });
};

export const ToastMessage = (params: ToastConfigParams<ToastMessageProps>) => {
  const {
    text1,
    text2,
    props: {status, action},
  } = params;
  return (
    <Block
      shadow={'Center'}
      radius={18}
      padding={12}
      width={rhs(width - 30)}
      borderColor={textColor[status]}
      backgroundColor={bgIconToast[status]}>
      <Block row alignItems={text2 ? undefined : 'center'}>
        <Image square={30} contentFit="contain" source={iconToast[status]} />
        <Block flex marginLeft={15}>
          {!!text1 && (
            <Text font="semiBold" fontSize={16} color={textColor[status]}>
              {text1}
            </Text>
          )}
          {!!text2 && <Text color={textColor[status]}>{text2}</Text>}
        </Block>
        {/* <Pressable contentCenter square={30} onPress={() => Toast.hide()}>
          <Icon type="Ionicons" name="close" color={textColor[status]} />
        </Pressable> */}
      </Block>
      {action?.title && (
        <Pressable
          marginLeft={45}
          marginTop={12}
          onPress={() => {
            Toast.hide();
            action.onPress();
          }}>
          <Text fontSize={14} font="black" color={textColor[status]}>
            {action.title}
          </Text>
        </Pressable>
      )}
    </Block>
  );
};
