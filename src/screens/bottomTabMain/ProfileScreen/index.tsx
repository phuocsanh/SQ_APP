import {useIsFocused} from '@react-navigation/native';
import {ICONS} from 'assets';
import {Avatar, Block, Icon, Image, Loading, Pressable, Text} from 'components';
import {StatusBar} from 'expo-status-bar';
import {navigationRef} from 'navigation/navigationRef';
import {useLogout} from 'queries/auth';
import {useQueryUserInfo} from 'queries/user';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppStore} from 'stores';
import {COLORS, GRADIENT} from 'theme';
import {displayVersion} from 'util/helper';

export default function ProfileScreen() {
  const userToken = useAppStore(state => state.accessToken);
  const logout = useLogout();
  const {top} = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const userInfo = useQueryUserInfo();

  useEffect(() => {
    if (!userToken && isFocused) {
      setTimeout(() => {
        navigationRef.goBack();
      }, 500);
    }
  }, [userToken, isFocused]);

  return (
    <Block flex backgroundColor={COLORS.white}>
      {logout.isPending && <Loading />}
      <Block position="absolute" width={'100%'}>
        <StatusBar />
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
        marginTop={(162 + top) / 3.5}
        backgroundColor={COLORS.white}
        padding={12}
        radius={12}
        marginHorizontal={16}>
        <Pressable rowCenter onPress={() => navigationRef.navigate('UpdateProfile')}>
          <Avatar uri={userInfo.data?.picture} name={userInfo.data?.name} radius={84} />
          <Block flex paddingLeft={15}>
            <Text numberOfLines={1} font={'bold'} color={COLORS.primary} fontSize={17}>
              {userInfo.data?.name}
            </Text>
            <Text
              numberOfLines={1}
              marginTop={6}
              font={'regular'}
              color={COLORS.spanishGray}
              fontSize={15}>
              {userInfo.data?.note}
            </Text>
          </Block>
        </Pressable>
      </Block>
      <Block
        radius={12}
        paddingTop={10}
        backgroundColor={COLORS.white}
        paddingHorizontal={16}
        marginTop={20}>
        <Text font={'bold'} marginTop={6} numberOfLines={1} color={COLORS.black} fontSize={16}>
          {'Tài khoản'}
        </Text>
        {userInfo.data?.address_full && (
          <Block height={34} rowCenter paddingRight={15}>
            <Icon name="location" color={COLORS.spanishGray} type={'EvilIcons'} size={17} />
            <Text
              color={COLORS.philippineGray}
              font={'bold'}
              numberOfLines={2}
              marginLeft={16}
              fontSize={14}>
              {userInfo.data.address_full}
            </Text>
          </Block>
        )}

        {userInfo.data?.phone && (
          <Block height={34} rowCenter>
            <Icon name="phone" color={COLORS.spanishGray} type={'SimpleLineIcons'} size={14} />
            <Text
              color={COLORS.philippineGray}
              font={'bold'}
              numberOfLines={1}
              marginLeft={16}
              fontSize={14}>
              {userInfo.data.phone}
            </Text>
          </Block>
        )}

        <Block height={34} rowCenter>
          <Icon name="mail-outline" type={'Ionicons'} color={COLORS.spanishGray} size={16} />
          <Text
            font={'bold'}
            color={COLORS.philippineGray}
            numberOfLines={1}
            marginLeft={16}
            fontSize={14}>
            {userInfo.data?.email}
          </Text>
        </Block>
        <Text font={'bold'} marginTop={40} numberOfLines={1} color={COLORS.black} fontSize={16}>
          {'Khác'}
        </Text>
        <Block marginTop={20} radius={12} backgroundColor={COLORS.ghostTrafficWhite}>
          <Pressable
            paddingLeft={17}
            paddingRight={13}
            height={45}
            rowCenter
            onPress={() => {
              navigationRef.navigate('ActivationHistory');
            }}>
            <Block width={15}>
              <Image source={ICONS.ic_arrowSwap} height={11.6} width={10.5} />
            </Block>
            <Text
              flex
              color={COLORS.pineTree}
              font={'bold'}
              numberOfLines={1}
              marginLeft={20}
              fontSize={15}>
              {'Lịch sử kích hoạt'}
            </Text>
            <Icon name="chevron-right" color={COLORS.pineTree} type={'Octicons'} size={14} />
          </Pressable>
          <Pressable
            paddingLeft={17}
            paddingRight={13}
            height={45}
            rowCenter
            onPress={() => {
              navigationRef.navigate('ChangePassword');
            }}>
            <Image source={ICONS.ic_lock} height={14.5} width={13} />
            <Text
              flex
              color={COLORS.pineTree}
              font={'bold'}
              numberOfLines={1}
              marginLeft={20}
              fontSize={15}>
              {'Đổi mật khẩu'}
            </Text>
            <Icon name="chevron-right" color={COLORS.pineTree} type={'Octicons'} size={14} />
          </Pressable>
          <Pressable
            paddingLeft={13}
            paddingRight={13}
            height={45}
            rowCenter
            onPress={() => {
              navigationRef.navigate('DeleteAccount');
            }}>
            {/* <Image source={ICONS.ic_lock} height={14.5} width={13} /> */}
            <Icon type="MaterialCommunityIcons" name="delete" size={21} color={COLORS.primary} />
            <Text
              flex
              color={COLORS.pineTree}
              font={'bold'}
              numberOfLines={1}
              marginLeft={13}
              fontSize={15}>
              {'Xóa tài khoản'}
            </Text>
            <Icon name="chevron-right" color={COLORS.pineTree} type={'Octicons'} size={14} />
          </Pressable>
        </Block>
        <Pressable
          marginTop={41}
          alignSelf={'center'}
          paddingLeft={17}
          paddingRight={13}
          height={45}
          rowCenter
          onPress={() => logout.mutate()}>
          <Image source={ICONS.ic_logout} height={19.5} width={19.5} contentFit={'contain'} />
          <Text color={COLORS.red} font={'bold'} marginLeft={9} fontSize={16}>
            {'Thoát tài khoản'}
          </Text>
        </Pressable>
      </Block>
      <Text fontSize={10} textAlign="center" marginTop={3}>
        {displayVersion()}
      </Text>
    </Block>
  );
}
