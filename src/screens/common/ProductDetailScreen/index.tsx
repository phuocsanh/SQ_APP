import {StaticScreenProps} from '@react-navigation/native';
import {Block, Icon, Image, Pressable, Text} from 'components';
import {navigationRef} from 'navigation/navigationRef';
import {useGetProductDetail} from 'queries/product';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {COLORS, width, height} from 'theme';
import ShimmerProductDetail from './ShimmerProductDetail';

type ScreenProps = StaticScreenProps<{id: number}>;
const ProductDetailScreen = ({route}: ScreenProps) => {
  const {top} = useSafeAreaInsets();
  const {data, isPending} = useGetProductDetail({id: route.params.id});
  const [picture, setPicture] = useState<undefined | {uri: string; idx: number}>();

  useEffect(() => {
    if (data?.data.arr_picture[0]) {
      setPicture({uri: data.data.arr_picture[0], idx: 0});
    }
  }, [data?.data.arr_picture[0]]);

  return (
    <Block flex backgroundColor={COLORS.white}>
      {isPending ? (
        <ShimmerProductDetail />
      ) : (
        <>
          <Block width={width} height={height / 3.3}>
            {data?.data.picture && (
              <Image
                position="absolute"
                borderBottomLeftRadius={12}
                borderBottomRightRadius={12}
                width={'100%'}
                height={'100%'}
                source={picture ? picture : data.data.picture}
                contentFit="fill"
              />
            )}

            <Pressable
              onPress={() => navigationRef.goBack()}
              contentCenter
              marginLeft={15}
              radius={30}
              marginTop={top + 25}
              backgroundColor={COLORS.philippineSilver}
              square={28}>
              <Icon type="AntDesign" name="arrowleft" color={COLORS.white} size={18} />
            </Pressable>
          </Block>
          <Block flex paddingHorizontal={15}>
            <Block rowCenter marginTop={15}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.data.arr_picture &&
                  data.data.arr_picture.map((p, idx) => (
                    <Pressable
                      position="relative"
                      borderWidth={picture?.idx === idx ? 2 : 0}
                      borderColor={COLORS.primary}
                      key={idx}
                      width={62}
                      height={50}
                      zIndex={100}
                      radius={8}
                      marginRight={12}
                      onPress={() => {
                        setPicture({uri: p, idx: idx});
                      }}>
                      <Image
                        position="absolute"
                        zIndex={-100}
                        radius={6}
                        source={p}
                        width={'100%'}
                        height={'100%'}
                      />
                    </Pressable>
                  ))}
              </ScrollView>
            </Block>
            {/* <Block marginTop={20}>
          <Block rowCenter justifyContent="space-between">
            <Text fontSize={15} font="bold" color={COLORS.yellowGreen1}>
              Đã Kích Hoạt Bán Hàng
            </Text>
            <Text fontSize={14} font="medium" color={COLORS.dimGray}>
              Ngày 22/05/2024
            </Text>
          </Block>
          <Pressable
            radius={100}
            backgroundColor={COLORS.americanYellow}
            marginTop={15}
            contentCenter
            height={40}>
            <Text fontSize={14} font="medium" color={COLORS.white}>
              Kích hoạt bảo hành
            </Text>
          </Pressable>
        </Block> */}
            {/* <Block height={1} backgroundColor={COLORS.antiFlashWhite} marginVertical={20} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
              <Text font="bold" fontSize={16} color={COLORS.romanSilver}>
                Thông Tin Sản Phẩm
              </Text>
              <Text marginTop={15} font="bold" fontSize={17} color={COLORS.black}>
                {data?.data.title || ''}
              </Text>

              {data?.data.short &&
                Object.values(data.data.short).map((s, idx) => (
                  <Block key={idx} marginTop={10} rowCenter justifyContent="space-between">
                    <Text font="bold" fontSize={15}>
                      {s.key}
                    </Text>
                    <Text fontSize={15}>{s.value}</Text>
                  </Block>
                ))}
              <Block height={1} backgroundColor={COLORS.antiFlashWhite} marginVertical={18} />
              <Text font="bold" fontSize={16} color={COLORS.romanSilver}>
                Mô Tả Sản Phẩm
              </Text>

              <WebView
                originWhitelist={['*']}
                source={{
                  html: `
                      <html>
                        <head>
                          <style>
                            body {
                              font-size: 40px; /* Bạn có thể tăng giá trị này để chữ lớn hơn */
                              line-height: 1.6; /* Giãn dòng để dễ đọc hơn */
                              color: #000; /* Màu chữ */
                            }
                          </style>
                        </head>
                        <body>
                        ${data?.data.content || ''}
                        </body>
                      </html>
                    `,
                }}
                style={{flex: 1, minHeight: 200, marginBottom: 50}}
              />
            </ScrollView>
          </Block>
        </>
      )}
    </Block>
  );
};

export default ProductDetailScreen;
