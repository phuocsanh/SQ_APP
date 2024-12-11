import {IMAGES} from 'assets';
import {Block, Icon, Image, List, Pressable, Text, TextInput} from 'components';
import {StatusBar} from 'expo-status-bar';
import moment from 'moment';
import {navigationRef} from 'navigation/navigationRef';
import {useGetNewsAllData} from 'queries/news';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, rhs, width} from 'theme';
import ShimmerItemTab from './ShimmerItemTab';

export default function SearchNewsBottomScreen() {
  const {top} = useSafeAreaInsets();
  const [keySearch, setKeySearch] = useState('');
  const {data, isPending, refetch, fetchNextPage, hasNextPage} = useGetNewsAllData({
    keyword: keySearch,
  });
  const newData = data?.pages.map(page => page.data.data).flat();

  const onEndReached = () => {
    if (hasNextPage && !isPending) {
      fetchNextPage();
    }
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      <Block position="absolute">
        <StatusBar />
        <Image height={162 + top} width={rhs(width)} source={IMAGES.img_bg_header} />
      </Block>
      <Block height={40} rowCenter marginTop={(142 + top) / 3.5}>
        <Pressable
          marginLeft={8}
          position="absolute"
          zIndex={199}
          height={40}
          width={40}
          onPress={() => {
            navigationRef.goBack();
          }}
          contentCenter>
          <Icon type="FontAwesome6" name="arrow-left" size={20} color={COLORS.darkJungleGreen} />
        </Pressable>
        <Text font={'bold'} textAlign={'center'} color={COLORS.black} fontSize={18}>
          {'Tin Tức'}
        </Text>
      </Block>
      <Block
        marginTop={20}
        marginHorizontal={18}
        height={38}
        radius={20}
        paddingHorizontal={18}
        rowCenter
        justifyContent={'space-between'}
        backgroundColor={COLORS.white}>
        <Icon name={'search1'} type={'AntDesign'} size={17} color={COLORS.sonicSilver} />
        <TextInput
          focusable={true}
          style={{
            height: 40,
            width: '93%',
          }}
          placeholder={'Tìm kiếm tin tức...'}
          value={keySearch}
          onChangeText={setKeySearch}
        />
      </Block>
      <Block flex paddingHorizontal={16} paddingTop={20}>
        <List
          isLoadmore={hasNextPage}
          onEndReached={onEndReached}
          onRefresh={refetch}
          data={newData || []}
          isLoading={isPending}
          LoadingComponent={ShimmerItemTab}
          renderItem={({
            item,
            index,
          }: {
            item: {
              item_id: string;
              title: string;
              picture: string;
              created_at: number;
              group: {
                title: string;
              };
            };
            index: number;
          }) => (
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
                  <Icon
                    name={'clock'}
                    type={'EvilIcons'}
                    size={15}
                    color={COLORS.philippineGray1}
                  />
                  <Text font={'regular'} color={COLORS.philippineGray1} fontSize={13}>
                    {moment.unix(item.created_at).format('DD-MM-YYYY') || ''}
                  </Text>
                </Block>
              </Block>
            </Pressable>
          )}
        />
      </Block>
    </Block>
  );
}
