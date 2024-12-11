import React, {useCallback, useEffect} from 'react';
import {Block} from '../Block';
import {create} from 'zustand';
import {COLORS} from 'theme';
import {Pressable} from '../Pressable';
import {Text} from '../Text';
import {BackHandler} from 'react-native';

type Store = {
  visible: boolean;
  onConfirm?: (result: boolean | null) => void;
  option: {
    title: string | null;
    message: string | null;
    textConfirm: string;
    /**
     * null: No cancel button
     *
     * undefined: default 'Hủy' button
     */
    textCancel: string | null;
  };
};

const DEFAULT_OPTION: Store['option'] = {
  title: 'Xác nhận',
  message: 'Bạn có muốn xác nhận?',
  textConfirm: 'Xác nhận',
  textCancel: 'Hủy',
};

const useStore = create<Store>()(() => ({
  visible: false,
  option: DEFAULT_OPTION,
}));

/**
 * @returns
 * - true: onConfirm
 * - false: onCancel
 * - null: onDismiss
 * - 0: Bỏ qua, chỉ xảy ra khi gọi confirm nhiều lần
 */
export const confirm = (option?: Partial<Store['option']>): Promise<boolean | null | 0> => {
  const visible = useStore.getState().visible;
  if (visible) {
    return Promise.resolve(0);
  }
  const resultPromise = new Promise((resolve: (result: boolean | null) => void) => {
    useStore.setState({
      visible: true,
      onConfirm: resolve,
      option: {
        title: option?.title === undefined ? DEFAULT_OPTION.title : option.title,
        message: option?.message === undefined ? DEFAULT_OPTION.message : option.message,
        textConfirm: option?.textConfirm || DEFAULT_OPTION.textConfirm,
        textCancel:
          option?.textCancel === undefined ? DEFAULT_OPTION.textCancel : option.textCancel,
      },
    });
  });
  return resultPromise;
};

export const ModalConfirm = () => {
  const visible = useStore(state => state.visible);
  const option = useStore(state => state.option);
  const onConfirm = useStore(state => state.onConfirm);

  const onDismiss = useCallback(() => {
    useStore.setState({visible: false});
    onConfirm?.(null);
  }, [onConfirm]);

  const onCancel = useCallback(() => {
    useStore.setState({visible: false});
    onConfirm?.(false);
  }, [onConfirm]);

  useEffect(() => {
    if (visible) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onDismiss();
        return true;
      });
      return backHandler.remove;
    }
  }, [onDismiss, visible]);

  if (!visible) {
    return null;
  }
  return (
    <Pressable
      absoluteFillObject
      backgroundColor={COLORS.blackTransparent40}
      justifyContent="center"
      zIndex={10}
      activeOpacity={1}
      onPress={onDismiss}>
      <Block
        backgroundColor={COLORS.white}
        radius={10}
        marginHorizontal={20}
        paddingHorizontal={20}
        paddingTop={30}
        paddingBottom={10}>
        {option.title !== null && (
          <Text textAlign="center" fontSize={21} numberOfLines={2} font="bold">
            {option.title}
          </Text>
        )}
        {option.message !== null && (
          <Text marginTop={16} fontSize={16} lineHeight={26} textAlign="center">
            {option.message}
          </Text>
        )}
        <Block row marginTop={23} justifyContent="center">
          {option.textCancel !== null ? (
            <Pressable
              flex
              marginRight={16}
              contentCenter
              radius={40}
              backgroundColor={COLORS.white}
              borderWidth={1}
              borderColor={COLORS.primary}
              onPress={onCancel}
              paddingVertical={8}
              paddingHorizontal={15}>
              <Text color={COLORS.primary} fontSize={16} font="semiBold">
                {option.textCancel}
              </Text>
            </Pressable>
          ) : null}
          <Pressable
            flex={option.textCancel === null ? undefined : true}
            contentCenter
            radius={40}
            backgroundColor={COLORS.primary}
            borderWidth={1}
            borderColor={COLORS.primary}
            paddingVertical={8}
            paddingHorizontal={15}
            onPress={() => {
              useStore.setState({visible: false});
              onConfirm?.(true);
            }}>
            <Text color={COLORS.white} fontSize={16} font="semiBold">
              {option.textConfirm}
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Pressable>
  );
};
