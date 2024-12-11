import {Block, CheckBox, Image, Pressable, Text} from 'components';
import {ProductInfo} from 'models/products';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {COLORS} from 'theme';

const ProductItem = ({
  item,
  onSelect,
  onDelete,
}: {
  item: ProductInfo & {selected?: boolean};
  onSelect: (qrCode: string) => void;
  onDelete: (qrCode: string) => void;
}) => {
  return (
    <Swipeable
      friction={1}
      renderRightActions={(prog, drag) => (
        <DeleteView prog={prog} drag={drag} onPress={() => onDelete(item.qrcode)} />
      )}
      containerStyle={{marginTop: 15}}
      overshootRight={false}>
      <Block
        backgroundColor={COLORS.white}
        radius={8}
        row
        paddingHorizontal={9}
        paddingVertical={12}>
        <CheckBox
          activeOpacity={1}
          alignSelf="center"
          isCheck={item.selected}
          onPress={() => onSelect(item.qrcode)}
        />
        <Image
          marginLeft={12}
          radius={4}
          contentFit="cover"
          source={item.product.picture}
          width={60}
          height={45}
        />
        <Block marginLeft={12} flex>
          <Text font="semiBold" fontSize={16} numberOfLines={1}>
            {item.product.title}
          </Text>
          <Text fontSize={13} marginTop={5}>
            {'Mã kích hoạt: '}
            <Text font="bold">{item.active_code}</Text>
          </Text>
        </Block>
        <Pressable
          radius={4}
          backgroundColor={COLORS.primary}
          alignSelf="flex-end"
          paddingVertical={6}
          paddingHorizontal={8}>
          <Text color={COLORS.white}>{'Kích hoạt'}</Text>
        </Pressable>
      </Block>
    </Swipeable>
  );
};

function DeleteView({
  // prog,
  drag,
  onPress,
}: {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  onPress: () => void;
}) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      width: 70,
      transform: [{translateX: drag.value + 70}],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable
        onPress={onPress}
        flex
        backgroundColor={COLORS.red}
        contentCenter
        borderTopRightRadius={8}
        borderBottomRightRadius={8}>
        <Text color={COLORS.white} font="bold">
          {'Xóa'}
        </Text>
      </Pressable>
    </Reanimated.View>
  );
}

export default ProductItem;
