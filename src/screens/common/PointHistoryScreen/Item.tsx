import React from 'react';
import {Block, Icon, Image, Text} from 'components';
import {COLORS} from 'theme';
import {ICONS, IMAGES} from 'assets';
import {PointHistoryItem} from 'models/pointHistotry';
import moment from 'moment';

const Item = ({item, index, length}: {item: PointHistoryItem; index: number; length: number}) => {
  return (
    <Block
      marginBottom={index === length - 1 ? 150 : 0}
      rowCenter
      marginHorizontal={15}
      marginTop={15}
      backgroundColor={COLORS.white}
      radius={8}
      padding={12}>
      <Image
        source={item.type === 'warranty' ? IMAGES.img_point_guarantee : IMAGES.img_point_sell}
        width={38}
        height={50}
      />
      <Block flex marginLeft={15} justifyContent="space-between">
        <Block flex>
          <Text fontSize={15} font="medium">
            {item.title}
          </Text>
        </Block>

        <Block rowCenter justifyContent="space-between">
          <Block rowCenter>
            <Icon
              marginLeft={-3}
              type="EvilIcons"
              name="clock"
              size={18}
              marginTop={-1}
              color={COLORS.philippineGray1}
            />
            <Text color={COLORS.philippineGray1} fontSize={13}>
              {moment.unix(item.created_at || 0).format('DD-MM-YYYY')}
            </Text>
          </Block>
          <Block rowCenter>
            <Text font="bold">+</Text>
            <Image marginHorizontal={5} source={ICONS.ic_point} square={16} contentFit="fill" />
            <Text fontSize={16} font="bold" color={COLORS.primary}>
              {item.value}{' '}
              <Text fontSize={16} font="bold">
                Point
              </Text>
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Item;
