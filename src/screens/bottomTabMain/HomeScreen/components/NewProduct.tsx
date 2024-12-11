import {ScrollView} from 'react-native';
import React from 'react';
import {Block, Image, Pressable, Text} from 'components';
import {COLORS, width} from 'theme';
import {convertCurrency} from 'util/helper';
import {HomeData} from 'models/other';
import {navigationRef} from 'navigation/navigationRef';

const NewProduct = ({data}: {data: HomeData['product']}) => {
  return (
    <Block row>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((p, idx) => (
          <Pressable
            width={width * 0.33}
            radius={8}
            key={idx}
            marginLeft={idx > 0 ? 20 : 0}
            onPress={() => navigationRef.navigate('ProductDetail', {id: p.item_id})}>
            <Image
              radius={8}
              width={'100%'}
              height={width * 0.28}
              source={p.picture}
              contentFit="cover"
            />
            <Block flex justifyContent="space-between">
              <Text
                textAlign="center"
                numberOfLines={2}
                fontSize={14}
                marginTop={8}
                color={COLORS.black}>
                {p.title}
              </Text>
              <Text textAlign="center" fontSize={15} font={'bold'} color={COLORS.darkJungleGreen}>
                {p.item_code}
              </Text>
              <Text textAlign="center" fontSize={15} font={'bold'} color={COLORS.primary}>
                {convertCurrency(p.price_sale)}
              </Text>
            </Block>
          </Pressable>
        ))}
      </ScrollView>
    </Block>
  );
};

export default NewProduct;
