import React, {useEffect, useState} from 'react';
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Block, Image, Pressable, Text} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {FeDropShadow, Filter, Path} from 'react-native-svg';
import HomeScreen from 'screens/bottomTabMain/HomeScreen';
import ProfileScreen from 'screens/bottomTabMain/ProfileScreen';
import {COLORS, rhs, width} from 'theme';
import {IS_IOS} from 'util/constant';
import ProductScreen from 'screens/bottomTabMain/ProductScreen';
import NewsScreen from 'screens/bottomTabMain/NewsScreen';
import {ICONS} from 'assets';
import {navigationRef} from './navigationRef';
import {Keyboard, Platform} from 'react-native';
import {useAppStore} from 'stores';
import {ScanType} from 'models/other';
import checkAuthNavigate from './checkAuthNavigate';
import {getUserInfo} from 'queries/cache';
import {ActivePermission} from 'models/user';

const TAB_BAR_HEIGHT_ORIGIN = 79;
const ITEW_MIDDLE_WIDTH = 108;
const CENTER_X = width / 2;
const POINTS_X = [
  [CENTER_X - 46.7, CENTER_X - 40.96, CENTER_X - 36.85],
  [CENTER_X - 28.3, CENTER_X - 21.76, CENTER_X],
  [CENTER_X + 21.76, CENTER_X + 28.3, CENTER_X + 36.85],
  [CENTER_X + 40.96, CENTER_X + 46.7, CENTER_X + ITEW_MIDDLE_WIDTH / 2],
];
const ITEM_MIDDLE_WIDTH_START = CENTER_X - ITEW_MIDDLE_WIDTH / 2;
const DEPTH = 32.5;
const SHADOW_SIZE = 2;

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const userToken = useAppStore(s => s.userToken);

  useEffect(() => {
    if (userToken) {
      console.log('---User Token---');
      console.log(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const TAB_BAR_HEIGHT = TAB_BAR_HEIGHT_ORIGIN + bottom / 2;
  const renderIcon = (routeName: string, isFocus: boolean) => {
    let icon: number | null = null;
    switch (routeName) {
      case 'Trang chủ':
        icon = ICONS.ic_home;
        break;
      case 'Sản phẩm':
        icon = ICONS.ic_product;
        break;
      case 'Tin tức':
        icon = ICONS.ic_news;
        break;
      case 'Tài khoản':
        icon = ICONS.ic_profile;
        break;
      default:
        icon = ICONS.ic_home;
        break;
    }
    if (!icon) {
      return;
    }
    return (
      <Image square={18} source={icon} tintColor={isFocus ? COLORS.primary : COLORS.sonicSilver} />
    );
  };

  return (
    <Block
      position="absolute"
      bottom={Platform.OS === 'android' ? (isKeyboardVisible ? -200 : 0) : 0}
      height={rhs(TAB_BAR_HEIGHT)}>
      <Svg
        width={width}
        height={TAB_BAR_HEIGHT}
        viewBox={`0 0 ${width} ${TAB_BAR_HEIGHT}`}
        fill="none">
        <Filter id="shadow">
          <FeDropShadow
            dx="0"
            dy="-0.1"
            stdDeviation="10"
            floodColor="#000000"
            floodOpacity={IS_IOS ? '0.05' : '0.1'}
          />
        </Filter>
        <Path
          filter="url(#shadow)"
          d={`M0 ${20 + SHADOW_SIZE}
              C0 ${10 + SHADOW_SIZE} 10 ${SHADOW_SIZE} 20 ${SHADOW_SIZE}
              H${ITEM_MIDDLE_WIDTH_START}
              C${POINTS_X[0]?.[0]} ${SHADOW_SIZE} ${POINTS_X[0]?.[1]} ${
                1.74 + SHADOW_SIZE
              } ${POINTS_X[0]?.[2]} ${6.72 + SHADOW_SIZE}
              C${POINTS_X[1]?.[0]} ${16.94 + SHADOW_SIZE} ${POINTS_X[1]?.[1]} ${
                DEPTH + SHADOW_SIZE
              } ${POINTS_X[1]?.[2]} ${DEPTH + SHADOW_SIZE}
              C${POINTS_X[2]?.[0]} ${DEPTH + SHADOW_SIZE} ${POINTS_X[2]?.[1]} ${
                16.94 + SHADOW_SIZE
              } ${POINTS_X[2]?.[2]} ${6.72 + SHADOW_SIZE}
              C${POINTS_X[3]?.[0]} ${1.74 + SHADOW_SIZE} ${
                POINTS_X[3]?.[1]
              } ${SHADOW_SIZE} ${POINTS_X[3]?.[2]} ${SHADOW_SIZE}
              H${width - 20}
              C${width - 10} ${SHADOW_SIZE} ${width} ${
                10 + SHADOW_SIZE
              } ${width} ${20 + SHADOW_SIZE}
              V${TAB_BAR_HEIGHT}
              H0
              V${20 + SHADOW_SIZE}Z`}
          fill={'white'}
        />
      </Svg>

      <Block absoluteFillObject row>
        {state.routes.map((route, index) => {
          // route.key luôn đảm bảo có trong descriptors
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const options = descriptors[route.key]!.options;
          const isFocused = state.index === index;
          const onPress = () => {
            if (route.name === 'Profile' && !userToken) {
              navigationRef.navigate('Login');
              return;
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            if (route.name === 'Profile' && !userToken) {
              return;
            }
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          if (route.name === 'QR') {
            return (
              <Block key={'QR'}>
                <Block
                  position="absolute"
                  bottom={rhs(TAB_BAR_HEIGHT - DEPTH + 7.5)}
                  width={'100%'}
                  alignItems="center">
                  <Pressable
                    radius={50}
                    backgroundColor={COLORS.white}
                    shadow={3}
                    onPress={() => {
                      const userPermission = getUserInfo()?.group_code;
                      if (checkAuthNavigate() && userPermission) {
                        const scanType =
                          userPermission === ActivePermission.BOTH
                            ? ScanType.GENERAL
                            : userPermission === ActivePermission.SALE
                              ? ScanType.SALE
                              : ScanType.WARRANTY;
                        navigationRef.navigate('ScanQr', {type: scanType});
                      }
                    }}>
                    <Image source={ICONS.ic_qr} contentFit="cover" square={56} />
                  </Pressable>
                </Block>
                <Block
                  marginTop={DEPTH + 7.5}
                  backgroundColor="#3465B1"
                  radius={100}
                  paddingHorizontal={10}
                  height={16}
                  justifyContent="center">
                  <Text fontSize={9} font="medium" color={COLORS.white}>
                    {'Quét mã QR'}
                  </Text>
                </Block>
              </Block>
            );
          }
          return (
            <Pressable
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              flex
              alignItems="center"
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Block
                round={28}
                marginTop={14}
                contentCenter
                backgroundColor={isFocused ? COLORS.water : COLORS.ghostWhite}>
                {renderIcon(options.title || '', isFocused)}
              </Block>
              <Text fontSize={12} marginTop={5}>
                {options.title}
              </Text>
            </Pressable>
          );
        })}
      </Block>
    </Block>
  );
};

const BottomTabMain = createBottomTabNavigator({
  tabBar: props => <CustomTabBar {...props} />,
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Trang chủ'},
    },
    Product: {
      screen: ProductScreen,
      options: {title: 'Sản phẩm'},
    },
    QR: () => null,
    News: {
      screen: NewsScreen,
      options: {title: 'Tin tức'},
    },
    Profile: {
      screen: ProfileScreen,
      options: {title: 'Tài khoản'},
    },
  },
});

export default BottomTabMain;
