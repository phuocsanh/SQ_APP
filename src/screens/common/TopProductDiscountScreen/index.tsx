import React, {useState} from 'react';
import {Block, EmptyData, Icon, Loading, Pressable, Text} from 'components';
import {COLORS, GRADIENT} from 'theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, TextInput} from 'react-native';
import {useGetListProductGroup, useGetListProductTopDiscount} from 'queries/product';
import Item from './components/ProductItem';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from 'navigation/navigationRef';

const TopProductDiscountScreen = () => {
  const {top} = useSafeAreaInsets();
  const {bottom} = useSafeAreaInsets();
  const [category, setCategory] = useState<number | null>(null);
  const [keyword, setKeyword] = useState('');

  const {data: dataProductGroup, isPending: isLoadingProductGroup} = useGetListProductGroup();
  const {
    data: dataTopDiscount,
    isPending,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetListProductTopDiscount({});

  const newData = dataTopDiscount?.pages.map(page => page.data.data).flat();

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
          <LinearGradient
            colors={GRADIENT.header}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 135 + top,
              paddingTop: Platform.OS === 'ios' ? top : top + 10,
            }}
          />
        </Block>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS dùng padding, Android dùng height
        >
          <Block>
            <Block
              paddingTop={10}
              paddingBottom={10}
              marginTop={(80 + top) / 3.5}
              paddingHorizontal={15}
              rowCenter
              justifyContent="space-between">
              <Pressable
                paddingRight={20}
                paddingVertical={10}
                onPress={() => navigationRef.navigate('BottomTabMain', {screen: 'Home'})}
                justifyContent="center">
                <Icon type="FontAwesome6" name="arrow-left" size={20} color={COLORS.white} />
              </Pressable>
              <Text fontSize={18} font="bold" color={COLORS.white}>
                Top giảm giá
              </Text>
              <Pressable backgroundColor={COLORS.primary} padding={5} radius={40}>
                <Icon type="AntDesign" name={'shoppingcart'} color={COLORS.white} size={20} />
                <Block
                  backgroundColor={COLORS.red}
                  round={18}
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                  top={-10}
                  left={-10}>
                  <Text color={COLORS.white} fontSize={12}>
                    4
                  </Text>
                </Block>
              </Pressable>
            </Block>
            <Block
              rowCenter
              marginTop={10}
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
          <Block marginTop={50} paddingHorizontal={15}>
            <FlatList
              onRefresh={refetch}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 380 + bottom}}
              refreshing={false}
              key={'2'}
              data={newData || []}
              keyExtractor={item => item._id.toString()}
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

export default TopProductDiscountScreen;
