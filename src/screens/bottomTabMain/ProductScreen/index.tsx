import React, {useState} from 'react';
import {Block, EmptyData, Icon, Image, Loading, Text} from 'components';
import {COLORS} from 'theme';
import {IMAGES} from 'assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, TextInput} from 'react-native';
import {useGetListProduct, useGetListProductGroup, useGetProductBanner} from 'queries/product';
import ListHeader from './components/ListHeader';
import Item from './components/ProductItem';

const ProductScreen = () => {
  const {top} = useSafeAreaInsets();
  const {bottom} = useSafeAreaInsets();
  const [category, setCategory] = useState<number | null>(null);
  const [keyword, setKeyword] = useState('');

  const {data: dataProductBanner, isPending: isLoadingProductBanner} = useGetProductBanner();
  const {data: dataProductGroup, isPending: isLoadingProductGroup} = useGetListProductGroup();
  const {data, isPending, fetchNextPage, hasNextPage, refetch} = useGetListProduct({
    group_id: category,
    keyword,
  });
  const newData = data?.pages.map(page => page.data.data).flat();

  const onEndReached = () => {
    if (hasNextPage && !isPending) {
      fetchNextPage();
    }
  };
  const hanleSetKeyWord = (v: string) => {
    setTimeout(() => {
      setKeyword(v);
    }, 800);
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      {isPending && <Loading />}
      <Block flex>
        <Block position="absolute" width={'100%'}>
          <Image
            height={162 + top}
            width={'100%'}
            source={IMAGES.img_bg_header}
            contentFit="fill"
          />
        </Block>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS dùng padding, Android dùng height
        >
          <Block>
            <Block
              paddingTop={10}
              paddingBottom={10}
              marginTop={(162 + top) / 3}
              paddingHorizontal={15}
              rowCenter>
              <Text
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                }}
                fontSize={18}
                font="bold"
                color={COLORS.black}>
                Sản phẩm
              </Text>
            </Block>
            <Block
              rowCenter
              marginTop={15}
              radius={48}
              height={38}
              paddingHorizontal={5}
              marginHorizontal={15}
              backgroundColor={COLORS.white}>
              <Icon type="EvilIcons" name="search" color={COLORS.sonicSilver} />

              <TextInput
                onChangeText={hanleSetKeyWord}
                style={{fontSize: 14, flex: 1}}
                placeholder="Tìm kiếm sản phẩm"
                placeholderTextColor={COLORS.sonicSilver}
              />
            </Block>
          </Block>
          <Block marginTop={50} marginHorizontal={15}>
            <FlatList
              onRefresh={refetch}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 380 + bottom}}
              refreshing={false}
              key={'2'}
              ListHeaderComponent={
                <ListHeader
                  isLoadingProductBanner={isLoadingProductBanner}
                  isLoadingProductGroup={isLoadingProductGroup}
                  category={category}
                  setCategory={setCategory}
                  dataProductGroup={dataProductGroup?.data || []}
                  dataProductBanner={dataProductBanner?.data[0]?.content || ''}
                />
              }
              data={newData || []}
              keyExtractor={item => item.item_id.toString()}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              renderItem={({item, index}) => <Item item={item} index={index} />}
              onEndReached={onEndReached}
              ListEmptyComponent={<EmptyData />}
              ListFooterComponent={
                hasNextPage ? (
                  <Block height={50} contentCenter>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </Block>
                ) : null
              }
            />
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </Block>
  );
};

export default ProductScreen;
