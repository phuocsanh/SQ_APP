import React from 'react';
import {Block, Image, Pressable, Text} from 'components';
import {navigationRef} from 'navigation/navigationRef';
import {COLORS, width} from 'theme';
import {convertCurrency} from 'util/helper';
import {ProductItem} from 'models/products';

const Item = ({item, index}: {item: ProductItem; index: number}) => {
  return (
    <Pressable
      onPress={() => {
        navigationRef.navigate('ProductDetail', {id: item.item_id});
      }}
      key={index}
      width={'46%'}
      justifyContent="space-between"
      marginBottom={20}>
      <Image
        radius={8}
        width={'100%'}
        height={width * 0.4}
        source={item.picture}
        contentFit="cover"
      />
      <Block flex>
        <Text numberOfLines={2} textAlign="center" fontSize={14} marginTop={8} color={COLORS.black}>
          {item.title}
        </Text>
      </Block>

      <Text textAlign="center" font={'bold'} color={COLORS.darkJungleGreen} fontSize={15}>
        {item.item_code}
      </Text>
      <Text textAlign="center" font={'bold'} color={COLORS.primary} fontSize={15}>
        {convertCurrency(item.price_sale)}
      </Text>
    </Pressable>
  );
};

export default Item;
