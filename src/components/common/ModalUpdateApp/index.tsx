import {Block} from 'components/base/Block';
import {Pressable} from 'components/base/Pressable';
import {Text} from 'components/base/Text';
import {reloadAsync, useUpdates} from 'expo-updates';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from 'theme';

export const ModalUpdateApp = () => {
  const {isDownloading, isUpdatePending} = useUpdates();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isUpdatePending) {
      setVisible(true);
    }
  }, [isUpdatePending]);

  return (
    <>
      {isDownloading && (
        <Block position="absolute" top={30} right={20}>
          <ActivityIndicator color={COLORS.white} />
        </Block>
      )}
      {visible && (
        <Block
          absoluteFillObject
          paddingHorizontal={16}
          contentCenter
          backgroundColor={COLORS.blackTransparent60}>
          <Block
            backgroundColor={COLORS.white}
            width={'100%'}
            radius={10}
            paddingHorizontal={16}
            paddingVertical={20}>
            <Text textAlign="center" font="bold" fontSize={20}>
              {'Cập nhật'}
            </Text>
            <Text textAlign="center" marginTop={20} lineHeight={25} font="medium" fontSize={17}>
              {'Đã có bản cập nhật mới.\nKhởi động lại app để cập nhật.'}
            </Text>
            <Block row marginTop={20}>
              <Pressable
                flex
                marginRight={16}
                contentCenter
                radius={40}
                backgroundColor={COLORS.white}
                borderWidth={1}
                borderColor={COLORS.primary}
                onPress={() => setVisible(false)}
                paddingVertical={8}
                paddingHorizontal={15}>
                <Text color={COLORS.primary} fontSize={16} font="semiBold">
                  {'Để sau'}
                </Text>
              </Pressable>
              <Pressable
                flex
                contentCenter
                radius={40}
                backgroundColor={COLORS.primary}
                borderWidth={1}
                borderColor={COLORS.primary}
                paddingVertical={8}
                paddingHorizontal={15}
                onPress={() => {
                  reloadAsync();
                  setVisible(false);
                }}>
                <Text color={COLORS.white} fontSize={16} font="semiBold">
                  {'Khởi động lại'}
                </Text>
              </Pressable>
            </Block>
          </Block>
        </Block>
      )}
    </>
  );
};
