import {
  Animated,
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Portal } from '@gorhom/portal';
import { COLORS, DEFAULT_STYLES, height } from 'theme';

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

export type ModalProps = PropsWithChildren<
  Partial<{
    isVisible: boolean;
    /**
     * @deprecated
     * Chuyển sang sử dụng onRequestClosed
     */
    setIsVisible: (isVisible: boolean) => void;
    onRequestClose: () => void;
    position: 'top' | 'center' | 'bottom';
    onBackdropPress: () => void;
    backdropStyle: ViewStyle;
    containerStyle: ViewStyle;
    animationDuration: number;
    backdropOpacity: number;
    backButtonOnPress: () => void;
    isAbsoluteView: boolean;
  }>
>;

export const Modal = ({
  isVisible,
  setIsVisible,
  onRequestClose,
  position = 'bottom',
  onBackdropPress,
  backdropStyle,
  containerStyle,
  children,
  animationDuration = 100,
  backdropOpacity = 0.4,
  backButtonOnPress,
  isAbsoluteView,
}: ModalProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!modalShow) {
          return false;
        }
        if (backButtonOnPress) {
          backButtonOnPress();
        } else {
          setIsVisible?.(false);
          onRequestClose?.();
        }
        return true;
      }
    );

    return () => backHandler.remove();
  }, [modalShow]);

  useEffect(() => {
    if (isVisible) {
      setModalShow(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setModalShow(false);
        }
      });
    }
  }, [animatedValue, isVisible, animationDuration]);

  const rOverLayStyle = {
    backgroundColor: COLORS.black,
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, backdropOpacity],
    }),
  };

  const rContentStyle: ViewStyle =
    position === 'center'
      ? {
          flex: 1,
          justifyContent: 'center',
          transform: [
            {
              scale: animatedValue,
            },
          ],
        }
      : position === 'top'
      ? {
          flex: 1,
          justifyContent: 'flex-start',
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-height, 0],
              }),
            },
          ],
        }
      : {
          flex: 1,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        };

  const _onBackdropPress = () => {
    if (onBackdropPress) {
      onBackdropPress();
    } else {
      setIsVisible?.(false);
      onRequestClose?.();
    }
  };

  return modalShow ? (
    isAbsoluteView ? (
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 999 }]}>
        <TouchableWithoutFeedback onPress={_onBackdropPress}>
          <Animated.View
            style={[
              DEFAULT_STYLES.absoluteFillObject,
              rOverLayStyle,
              backdropStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[rContentStyle, containerStyle]}
          pointerEvents="box-none"
        >
          {children}
        </Animated.View>
      </View>
    ) : (
      <Portal hostName="root">
        <View style={StyleSheet.absoluteFillObject}>
          <TouchableWithoutFeedback onPress={_onBackdropPress}>
            <Animated.View
              style={[
                DEFAULT_STYLES.absoluteFillObject,
                rOverLayStyle,
                backdropStyle,
              ]}
            />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[rContentStyle, containerStyle]}
            pointerEvents="box-none"
          >
            {children}
          </Animated.View>
        </View>
      </Portal>
    )
  ) : null;
};
