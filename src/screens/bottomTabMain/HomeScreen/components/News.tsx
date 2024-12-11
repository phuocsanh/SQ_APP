import {ScrollView} from 'react-native';
import React from 'react';
import {Block, Icon, Image, Pressable, Text} from 'components';
import {COLORS, width} from 'theme';
import {HomeData} from 'models/other';
import moment from 'moment';
import {navigationRef} from 'navigation/navigationRef';

const News = ({data}: {data: HomeData['news']}) => {
  return (
    <Block rowCenter wrap>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((news, idx) => (
          <Pressable
            key={idx}
            width={width * 0.8}
            marginRight={15}
            onPress={() => {
              navigationRef.navigate('NewsDetail', {
                item_id: news.item_id,
              });
            }}>
            <Image
              radius={5}
              width={'100%'}
              height={width * 0.4}
              source={news.picture}
              contentFit="cover"
            />
            <Text font="semiBold" marginTop={8} fontSize={15} color={COLORS.black}>
              {news.title}
            </Text>
            <Block rowCenter>
              <Icon
                marginLeft={-3}
                type="EvilIcons"
                name="clock"
                size={18}
                color={COLORS.philippineGray1}
              />
              <Text color={COLORS.philippineGray1} fontSize={13}>
                {moment.unix(news.created_at || 0).format('DD-MM-YYYY')}
              </Text>
            </Block>
          </Pressable>
        ))}
      </ScrollView>
    </Block>
  );
};

export default News;
