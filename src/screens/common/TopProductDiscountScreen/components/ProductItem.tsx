import React from 'react';
import {Block, Icon, Image, Pressable, Text} from 'components';
import {navigationRef} from 'navigation/navigationRef';
import {COLORS, width} from 'theme';
import {convertCurrency} from 'util/helper';
import {ProductItem} from 'models/products';
import {formatToK} from '../../../../util/helper';

const Item = ({item, index}: {item: ProductItem; index: number}) => {
  return (
    <Pressable
      backgroundColor={COLORS.white}
      shadow={2}
      marginBottom={15}
      width={'47%'}
      radius={8}
      onPress={() => navigationRef.navigate('ProductDetail', {id: item._id})}>
      <Image
        radius={8}
        width={'100%'}
        height={width * 0.28}
        source={item.product_thumb}
        contentFit="contain"
      />
      <Block flex justifyContent="space-between" marginHorizontal={10} marginBottom={10}>
        <Text textAlign="center" numberOfLines={1} fontSize={14} marginTop={8} color={COLORS.black}>
          {item.product_name}
        </Text>
        <Block rowCenter justifyContent="space-between" marginTop={5}>
          <Block rowCenter>
            <Icon type="Foundation" name={'star'} size={15} color={COLORS.americanYellow} />
            <Text fontSize={15}>{item.product_ratingsAverage}</Text>
          </Block>
          <Block radius={50} paddingHorizontal={3} paddingVertical={1}>
            <Text fontSize={12}>Đã bán {formatToK(item.product_selled)}</Text>
          </Block>
        </Block>
        <Block rowCenter justifyContent="space-between" marginTop={5}>
          <Text fontSize={15} font={'bold'} color={COLORS.primary}>
            {convertCurrency(item.product_discountedPrice)}
          </Text>
          <Block
            backgroundColor={COLORS.bgError}
            radius={50}
            paddingHorizontal={3}
            paddingVertical={1}>
            <Text fontSize={12} font={'bold'} color={COLORS.red}>
              -{item.discount}%
            </Text>
          </Block>
        </Block>
      </Block>
    </Pressable>
  );
};

export default Item;
