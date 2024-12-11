import {Block, Icon, Image, Pressable, Text} from 'components';
import moment from 'moment';
import {navigationRef} from 'navigation/navigationRef';
import React from 'react';
import {COLORS} from 'theme';

const ItemTab = ({
  item,
  index,
}: {
  item: {
    title: string;
    item_id: string;
    picture: string;
    created_at: number;
    group: {
      title: string;
    };
  };
  index: number;
}) => {
  return (
    <Pressable
      key={index}
      marginBottom={15}
      backgroundColor={COLORS.white}
      radius={8}
      padding={8}
      row
      onPress={() => {
        navigationRef.navigate('NewsDetail', {
          item_id: item.item_id,
        });
      }}>
      <Image source={item.picture || ''} radius={12} width={118} height={92} />
      <Block justifyContent={'space-between'} paddingLeft={10} flex>
        <Text numberOfLines={2} font={'semiBold'} color={COLORS.black} fontSize={15}>
          {item.title || ''}
        </Text>

        <Block rowCenter>
          <Icon name={'clock'} type={'EvilIcons'} size={15} color={COLORS.philippineGray1} />
          <Text font={'regular'} color={COLORS.philippineGray1} fontSize={13}>
            {moment.unix(item.created_at).format('DD-MM-YYYY') || ''}
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
};

export default ItemTab;
