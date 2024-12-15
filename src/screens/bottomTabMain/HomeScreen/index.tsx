import {ICONS} from 'assets';
import {Avatar, Block, confirm, Icon, Image, Pressable, ScrollView, Text} from 'components';
import {ScanType} from 'models/other';
import {ActivePermission} from 'models/user';
import checkAuthNavigate from 'navigation/checkAuthNavigate';
import {navigationRef} from 'navigation/navigationRef';
import {getUserInfo} from 'queries/cache';
import {useGetNotifications} from 'queries/notification';
import {useQueryUserInfo} from 'queries/user';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppStore} from 'stores';
import {COLORS, GRADIENT, width} from 'theme';
import CarouselBanner from './components/CarouselBanner';
// import NewProduct from './components/NewProduct';
// import News from './components/News';
import ShimmerCarousel from './components/ShimmerCarousel';
// import ShimmerNews from './components/ShimmerNews';
// import ShimmerProduct from './components/ShimmerProduct';
import LinearGradient from 'react-native-linear-gradient';
import {Platform} from 'react-native';
import {useGetBanner} from 'queries/home';
import {useGetListProductBySelled, useGetListProductTopDiscount} from 'queries/product';
import ShimmerProduct from './components/ShimmerProduct';
import NewProduct from './components/NewProduct';
import {convertCurrency, formatToK} from 'util/helper';

const checkPermission = (permission: ActivePermission.SALE | ActivePermission.WARRANTY) => {
  const userPermission = getUserInfo()?.group_code;
  if (userPermission === ActivePermission.BOTH || userPermission === permission) {
    return true;
  } else {
    confirm({
      title: 'Không có quyền',
      message: 'Bạn không thể sử dụng tính năng này',
      textConfirm: 'Xác nhận',
      textCancel: null,
    });
    return false;
  }
};

const listService = [
  {
    icon: ICONS.ic_active_sell,
    title: 'Kích Hoạt Bán Hàng',
    onPress: () => {
      if (checkAuthNavigate() && checkPermission(ActivePermission.SALE)) {
        navigationRef.navigate('ScanQr', {type: ScanType.SALE});
      }
    },
  },
  {
    icon: ICONS.ic_active_guarantee,
    title: 'Kích Hoạt Bảo Hành',
    onPress: () => {
      if (checkAuthNavigate() && checkPermission(ActivePermission.WARRANTY)) {
        navigationRef.navigate('ScanQr', {type: ScanType.WARRANTY});
      }
    },
  },
  {
    icon: ICONS.ic_lookup_guarantee,
    title: 'Tra Cứu Bảo hành',
    onPress: () => {
      if (checkAuthNavigate()) {
        navigationRef.navigate('ScanQr', {type: ScanType.LOOK_UP});
      }
    },
  },
  {
    icon: ICONS.ic_point_history,
    title: 'Lịch Sử Điểm',
    onPress: () => {
      if (checkAuthNavigate()) {
        navigationRef.navigate('PointHistory');
      }
    },
  },
];

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {data, isPending, refetch} = useGetBanner();
  const banner = data?.data.filter(b => b.type_page === 'HOME') || [];

  const userToken = useAppStore(state => state.accessToken);
  const userInfo = useQueryUserInfo();
  const {data: dataNoti, refetch: refetchNoti} = useGetNotifications();
  const {data: dataTopDiscount, isPending: isPendingTopDiscount} = useGetListProductTopDiscount({});
  const {data: dataTopSelled, isPending: isPendingTopSelled} = useGetListProductBySelled({});
  const onRefetch = () => {
    refetch();
    refetchNoti();
  };
  return (
    <Block flex backgroundColor={COLORS.white}>
      <Block marginBottom={15}>
        <Block position="absolute" width={'100%'}>
          <LinearGradient
            colors={GRADIENT.header}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 162 + top,
              paddingTop: Platform.OS === 'ios' ? top : top + 10,
            }}
          />
        </Block>
        <Block
          marginTop={(162 + top) / 3.6}
          paddingHorizontal={15}
          rowCenter
          justifyContent="space-between">
          {userToken ? (
            <>
              <Block rowCenter>
                <Avatar name={userInfo.data?.name} uri={userInfo.data?.picture} size={34} />
                <Block marginLeft={15}>
                  <Text fontSize={15} color={COLORS.white}>
                    Xin chào!
                  </Text>
                  <Text fontSize={15} color={COLORS.white}>
                    {userInfo.data?.name}
                  </Text>
                </Block>
              </Block>
              <Pressable
                square={32}
                contentCenter
                backgroundColor={COLORS.white}
                radius={30}
                onPress={() => {
                  navigationRef.navigate('Notification');
                }}>
                {!!dataNoti?.pages[0]?.data.total_unview && (
                  <Block
                    position="absolute"
                    top={-4}
                    left={-8}
                    contentCenter
                    square={dataNoti.pages[0]?.data.total_unview > 10 ? 20 : 17}
                    radius={17}
                    backgroundColor={COLORS.red}>
                    <Text fontSize={8} color={COLORS.white}>
                      {dataNoti.pages[0]?.data.total_unview > 10
                        ? '+10'
                        : dataNoti.pages[0]?.data.total_unview}
                    </Text>
                  </Block>
                )}

                <Icon type="Octicons" name="bell" size={18} color={COLORS.darkJungleGreen} />
              </Pressable>
            </>
          ) : (
            <Pressable onPress={() => navigationRef.navigate('Login')}>
              <Text font="bold" fontSize={20} color={COLORS.white}>
                {'Đăng nhập'}
              </Text>
            </Pressable>
          )}
        </Block>
      </Block>
      <Block flex>
        <ScrollView style={{flex: 1, paddingBottom: 100}} onRefresh={onRefetch}>
          {!!userToken && (
            <Block
              radius={12}
              marginHorizontal={15}
              backgroundColor={COLORS.white}
              shadow={3}
              marginBottom={30}>
              <Block paddingHorizontal={20} paddingVertical={15}>
                <Text font="semiBold" color={COLORS.primary} fontSize={15}>
                  {userInfo.data?.name}
                </Text>
                <Text color={COLORS.philippineGray} fontSize={12}>
                  {userInfo.data?.address_full}
                </Text>
              </Block>
              <Block height={1} width={'100%'} backgroundColor={COLORS.brightGray} />
              <Pressable
                paddingHorizontal={20}
                paddingVertical={15}
                rowCenter
                onPress={() => navigationRef.navigate('PointHistory')}>
                <Image marginRight={6} source={ICONS.ic_point} square={20} contentFit="contain" />
                <Text fontSize={14} color={COLORS.darkJungleGreen}>
                  {userInfo.data?.point || '0'} Point
                </Text>
              </Pressable>
            </Block>
          )}
          <Block
            flex
            backgroundColor={userToken ? COLORS.transparent : COLORS.white}
            paddingTop={userToken ? 0 : 15}>
            {isPendingTopDiscount ? (
              <ShimmerCarousel />
            ) : (
              banner.length > 0 && <CarouselBanner data={banner} />
            )}
            <Block paddingHorizontal={15} backgroundColor={COLORS.white}>
              <Text fontSize={18} font="bold" color={COLORS.darkJungleGreen}>
                Voucher - Khuyến mãi
              </Text>
              <Block marginTop={10} row justifyContent="space-between"></Block>

              <Block marginTop={25} rowCenter justifyContent="space-between">
                <Text fontSize={18} font="bold" color={COLORS.darkJungleGreen}>
                  Top giảm giá
                </Text>
                <Pressable rowCenter onPress={() => navigationRef.navigate('TopProductDiscount')}>
                  <Text color={COLORS.primary} fontSize={16}>
                    Xem tất cả
                  </Text>
                  <Icon
                    color={COLORS.primary}
                    marginLeft={5}
                    type="FontAwesome6"
                    name="arrow-right"
                    size={18}
                  />
                </Pressable>
              </Block>
              <Block marginTop={20}>
                {isPendingTopDiscount ? (
                  <ShimmerProduct />
                ) : (
                  dataTopDiscount?.pages[0]?.data &&
                  dataTopDiscount?.pages[0]?.data?.data.length > 0 && (
                    <Block row wrap justifyContent="space-between">
                      {dataTopDiscount?.pages[0]?.data?.data.map((p, idx) => (
                        <Pressable
                          backgroundColor={COLORS.white}
                          shadow={2}
                          marginBottom={15}
                          width={'47%'}
                          radius={8}
                          key={idx}
                          onPress={() => navigationRef.navigate('ProductDetail', {id: p._id})}>
                          <Image
                            radius={8}
                            width={'100%'}
                            height={width * 0.28}
                            source={p.product_thumb}
                            contentFit="contain"
                          />
                          <Block
                            flex
                            justifyContent="space-between"
                            marginHorizontal={10}
                            marginBottom={10}>
                            <Text
                              textAlign="center"
                              numberOfLines={1}
                              fontSize={14}
                              marginTop={8}
                              color={COLORS.black}>
                              {p.product_name}
                            </Text>

                            <Block rowCenter justifyContent="space-between" marginTop={5}>
                              <Text fontSize={15} font={'bold'} color={COLORS.primary}>
                                {convertCurrency(p.product_discountedPrice)}
                              </Text>
                              <Block
                                backgroundColor={COLORS.bgError}
                                radius={50}
                                paddingHorizontal={3}
                                paddingVertical={1}>
                                <Text fontSize={12} font={'bold'} color={COLORS.red}>
                                  -{p.discount}%
                                </Text>
                              </Block>
                            </Block>
                          </Block>
                        </Pressable>
                      ))}
                    </Block>
                  )
                )}
              </Block>

              <Block marginTop={25} rowCenter justifyContent="space-between">
                <Text fontSize={18} font="bold" color={COLORS.darkJungleGreen}>
                  Bán chạy
                </Text>
                <Pressable rowCenter onPress={() => navigationRef.navigate('TopProductDiscount')}>
                  <Text color={COLORS.primary} fontSize={16}>
                    Xem tất cả
                  </Text>
                  <Icon
                    color={COLORS.primary}
                    marginLeft={5}
                    type="FontAwesome6"
                    name="arrow-right"
                    size={18}
                  />
                </Pressable>
              </Block>

              <Block marginTop={20}>
                {isPendingTopSelled ? (
                  <ShimmerProduct />
                ) : (
                  dataTopSelled?.pages[0]?.data &&
                  dataTopSelled?.pages[0]?.data?.data.length > 0 && (
                    <Block row wrap justifyContent="space-between">
                      {dataTopSelled?.pages[0]?.data?.data.map((p, idx) => (
                        <Pressable
                          backgroundColor={COLORS.white}
                          shadow={2}
                          marginBottom={15}
                          width={'47%'}
                          radius={8}
                          key={idx}
                          onPress={() => navigationRef.navigate('ProductDetail', {id: p._id})}>
                          <Image
                            radius={8}
                            width={'100%'}
                            height={width * 0.28}
                            source={p.product_thumb}
                            contentFit="contain"
                          />
                          <Block
                            flex
                            justifyContent="space-between"
                            marginHorizontal={10}
                            marginBottom={10}>
                            <Text
                              textAlign="center"
                              numberOfLines={1}
                              fontSize={14}
                              marginTop={8}
                              color={COLORS.black}>
                              {p.product_name}
                            </Text>
                            <Block rowCenter justifyContent="space-between" marginTop={5}>
                              <Block rowCenter>
                                <Icon
                                  type="Foundation"
                                  name={'star'}
                                  size={15}
                                  color={COLORS.americanYellow}
                                />
                                <Text fontSize={15}>{p.product_ratingsAverage}</Text>
                              </Block>
                              <Block radius={50} paddingHorizontal={3} paddingVertical={1}>
                                <Text fontSize={12}>Đã bán {formatToK(p.product_selled)}</Text>
                              </Block>
                            </Block>
                            <Block rowCenter justifyContent="space-between" marginTop={5}>
                              <Text fontSize={15} font={'bold'} color={COLORS.primary}>
                                {convertCurrency(p.product_discountedPrice)}
                              </Text>
                              <Block
                                backgroundColor={COLORS.bgError}
                                radius={50}
                                paddingHorizontal={3}
                                paddingVertical={1}>
                                <Text fontSize={12} font={'bold'} color={COLORS.red}>
                                  -{p.discount}%
                                </Text>
                              </Block>
                            </Block>
                          </Block>
                        </Pressable>
                      ))}
                    </Block>
                  )
                )}
              </Block>

              <Block marginTop={25} rowCenter justifyContent="space-between">
                <Text fontSize={18} font="bold" color={COLORS.darkJungleGreen}>
                  Tin tức
                </Text>
                <Pressable
                  rowCenter
                  onPress={() => navigationRef.navigate('BottomTabMain', {screen: 'News'})}>
                  <Text color={COLORS.primary} fontSize={16}>
                    Xem tất cả
                  </Text>
                  <Icon
                    color={COLORS.primary}
                    marginLeft={5}
                    type="FontAwesome6"
                    name="arrow-right"
                    size={18}
                  />
                </Pressable>
              </Block>
              {/* <Block marginTop={20}>
                {isPending ? <ShimmerNews /> : data?.data.news && <News data={data.data.news} />}
              </Block>
              <Block marginTop={25} rowCenter justifyContent="space-between">
                <Text fontSize={18} font="bold" color={COLORS.darkJungleGreen}>
                  Sản phẩm mới
                </Text>
                <Pressable
                  rowCenter
                  onPress={() => navigationRef.navigate('BottomTabMain', {screen: 'Product'})}>
                  <Text color={COLORS.primary} fontSize={16}>
                    Xem tất cả
                  </Text>
                  <Icon
                    color={COLORS.primary}
                    marginLeft={5}
                    type="FontAwesome6"
                    name="arrow-right"
                    size={18}
                  />
                </Pressable>
              </Block>
              <Block marginTop={20} marginBottom={140}>
                {isPending ? (
                  <ShimmerProduct />
                ) : (
                  data?.data.product && <NewProduct data={data.data.product} />
                )}
              </Block> */}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

export default HomeScreen;
