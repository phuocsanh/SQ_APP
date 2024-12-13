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
import {COLORS, GRADIENT} from 'theme';
import CarouselBanner from './components/CarouselBanner';
// import NewProduct from './components/NewProduct';
// import News from './components/News';
import ShimmerCarousel from './components/ShimmerCarousel';
// import ShimmerNews from './components/ShimmerNews';
// import ShimmerProduct from './components/ShimmerProduct';
import LinearGradient from 'react-native-linear-gradient';
import {Platform} from 'react-native';
import {useGetBanner} from 'queries/home';

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
            {isPending ? (
              <ShimmerCarousel />
            ) : (
              banner.length > 0 && <CarouselBanner data={banner} />
            )}
            <Block paddingHorizontal={15} backgroundColor={COLORS.white}>
              <Text fontSize={18} font="bold" color={COLORS.darkJungleGreen}>
                Dịch vụ
              </Text>
              <Block marginTop={10} row justifyContent="space-between">
                {listService.map((item, index) => (
                  <Pressable
                    onPress={() => {
                      if (!userToken) {
                        return navigationRef.navigate('Login');
                      }
                      item.onPress();
                    }}
                    key={index}
                    alignItems="center"
                    width={'20%'}>
                    <Block
                      square={60}
                      radius={60}
                      contentCenter
                      backgroundColor={COLORS.ghostWhite1}>
                      <Image source={item.icon} square={35} contentFit="contain" />
                    </Block>
                    <Text
                      font="medium"
                      marginTop={6}
                      fontSize={12}
                      lineHeight={20}
                      textAlign="center">
                      {item.title}
                    </Text>
                  </Pressable>
                ))}
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
