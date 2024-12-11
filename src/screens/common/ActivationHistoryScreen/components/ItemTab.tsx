import {Block, Image, Pressable, Text} from 'components';
import {ListScanned} from 'models/profile';
import moment from 'moment';
import React from 'react';
import {COLORS} from 'theme';

const ItemTab = ({
  item,
  index,
  type,
}: {
  item: ListScanned;
  index: number;
  type: 'active' | 'warranty';
}) => {
  return (
    <Pressable
      key={index}
      marginTop={15}
      backgroundColor={COLORS.white}
      radius={8}
      paddingHorizontal={9}
      paddingVertical={12}
      row>
      <Image source={item.product.picture} radius={4} width={78} height={58} />
      <Block paddingLeft={12} flex>
        <Text font={'semiBold'} color={COLORS.black} fontSize={16}>
          {item.product.title}
        </Text>
        <Text marginTop={4} font={'regular'} color={COLORS.black} fontSize={13}>
          {'Ngày kích hoạt: '}
          <Text font={'bold'} color={COLORS.black} fontSize={13}>
            {item.active_code}
          </Text>
        </Text>
        <Text marginTop={4} font={'regular'} color={COLORS.black} fontSize={13}>
          {'Mã kích hoạt: '}
          <Text font={'bold'} color={COLORS.black} fontSize={13}>
            {type === 'active'
              ? moment.unix(item.actived_at).format('DD/MM/YYYY')
              : moment.unix(item.warrantied_at).format('DD/MM/YYYY')}
          </Text>
        </Text>
      </Block>
    </Pressable>
  );
};

export default ItemTab;
