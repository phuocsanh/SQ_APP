import {ICONS} from 'assets';
import {Block, Icon, Image, Pressable, Text} from 'components';
import {NotificationItem} from 'models/notification';
import moment from 'moment';
import {navigationRef} from 'navigation/navigationRef';
import React from 'react';
import {COLORS} from 'theme';

const ItemList = ({item, index}: {item: NotificationItem; index: number}) => {
  return (
    <Pressable
      key={index}
      borderBottomColor={COLORS.brightTrafficGray}
      padding={16}
      backgroundColor={!item.viewed ? COLORS.aliceTrafficBlue : COLORS.white}
      borderBottomWidth={1}
      row
      onPress={() => {
        navigationRef.navigate('NotificationDetail', {
          id: item.item_id,
        });
      }}>
      <Image marginTop={2} source={ICONS.ic_notification} height={18} width={15.75} />
      <Block justifyContent={'space-between'} paddingLeft={8} flex>
        <Text numberOfLines={2} font={'semiBold'} color={COLORS.black} fontSize={15}>
          {item.title}
        </Text>
        <Block marginTop={8} rowCenter>
          <Icon name={'clock'} type={'EvilIcons'} size={15} color={COLORS.philippineGray1} />
          <Text font={'regular'} color={COLORS.philippineGray1} fontSize={13}>
            {moment.unix(item.created_at).format('DD-MM-YYYY')}
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
};

export default ItemList;
