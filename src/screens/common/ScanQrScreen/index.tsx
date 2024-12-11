import {Block, confirm, Icon, Pressable, Text} from 'components';
import {navigationRef} from 'navigation/navigationRef';
import React, {useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import QrMask from './components/QrMask';
import {ActivityIndicator, Linking, StyleSheet} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {productInfoOption} from 'queries/product';
import {StaticScreenProps, useIsFocused} from '@react-navigation/native';
import {ActiveType, ScanType} from 'models/other';
import {ProductInfo} from 'models/products';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useAppStore} from 'stores';

// const _listQR = [
//   'P5098BFLY1',
//   '5T83XLW9GR',
//   'DD7IKTH8PI',
//   'Q4A1H6SYV7',
//   '0RMVKEEBZD',
//   '1E3HPU2UHW',
//   'UZOT3YS76L',
//   '1VIS4JYDLP',
//   'DDUDWTVIS5',
//   'G9DS9SVELZ',
//   'AM09JCRM3R',
//   'IGR2GXFPSE',
//   'NAHXN1G015',
//   'RH9CMX0USK',
//   'WM0ALOPC1E',
//   'KJQLJBJVPF',
//   'SVNATHVTX4',
//   'UA6JQUHFCJ',
//   '14MI30XWG1',
//   'SLZJMCUC79',
//   'KGCXHBCUEJ',
//   'Z12VTRW1LM',
//   'ZQ6QXA855N',
//   'V8AEHBMW24',
//   'LXK1CL952Y',
//   'abc',
//   'xyz',
//   '123',
//   '455',
//   '234',
// ];

type ScreenProps = StaticScreenProps<{type: ScanType}>;
const HEADER_TITLE = {
  [ScanType.GENERAL]: 'Quét mã',
  [ScanType.SALE]: 'Kích hoạt bán hàng',
  [ScanType.WARRANTY]: 'Kích hoạt bảo hành',
  [ScanType.LOOK_UP]: 'Tra cứu bảo hành',
};

export default function ScanQrScreen({route}: ScreenProps) {
  const {type} = route.params;
  const {top, bottom} = useSafeAreaInsets();
  const {hasPermission, requestPermission} = useCameraPermission();
  const [userDeniedPermission, setUserDeniedPermission] = useState(false);
  const waitingConfirm = useRef(false);
  const [qrCode, setQrCode] = useState<string>();
  const productInfo = useQuery(productInfoOption(qrCode));
  const scannedProducts = useAppStore(state => state.scannedProducts);
  const isFocused = useIsFocused();
  const device = useCameraDevice('back');
  const lastTimeResult = useRef(0);

  useEffect(() => {
    useAppStore.setState({scannedProducts: []});
  }, []);

  // const demo = () => {
  //   onBarcodeScanned({data: listQR[faker.number.int({min: 0, max: listQR.length - 1})]});
  // };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const now = Date.now();
      if (now - lastTimeResult.current < 1500 || waitingConfirm.current || productInfo.isFetching) {
        return;
      }
      lastTimeResult.current = now;
      if (codes[0]?.value) {
        setQrCode(codes[0].value);
      }
    },
  });

  const onCartPress = (products = scannedProducts) => {
    navigationRef.navigate('ListActiveProduct', {products});
  };

  const confirmProduct = async (product: ProductInfo) => {
    const res = await confirm({
      title: 'Kích hoạt',
      message: 'Bạn muốn kích hoạt sản phẩm ngay bây giờ?',
      textConfirm: 'Kích hoạt',
      textCancel: 'Quét tiếp',
    });
    const newProducts = scannedProducts.find(p => p.qrcode === product.qrcode)
      ? scannedProducts
      : [...scannedProducts, product];
    if (res) {
      if (newProducts.length === 1) {
        if (type === ScanType.SALE || !product.actived_at) {
          navigationRef.navigate('ActiveResult', {
            data: newProducts,
            type: ActiveType.SALE,
          });
        } else if (type === ScanType.WARRANTY || product.actived_at) {
          navigationRef.navigate('WarrantyActivation', {products: newProducts});
        }
      } else {
        useAppStore.setState({scannedProducts: newProducts});
        onCartPress(newProducts);
      }
    }
    if (res === false) {
      useAppStore.setState({scannedProducts: newProducts});
    }
  };

  const handleActiveSale = async (product: ProductInfo) => {
    if (product.actived_at || product.warrantied_at) {
      const res = await confirm({
        title: 'Đã kích hoạt',
        message: 'Sản phẩm đã kích hoạt',
        textConfirm: 'Xem chi tiết',
        textCancel: 'Quét tiếp',
      });
      if (res) {
        navigationRef.navigate('ActiveStatus', {qrCode: product.qrcode});
      }
      return;
    }
    await confirmProduct(product);
  };

  const handleActiveWarranty = async (product: ProductInfo) => {
    if (!product.actived_at) {
      await confirm({
        title: 'Chưa kích hoạt',
        message: 'Sản phẩm chưa kích hoạt bán hàng',
        textConfirm: 'Quét tiếp',
        textCancel: null,
      });
      return;
    }
    if (product.warrantied_at) {
      const res = await confirm({
        title: 'Đã kích hoạt',
        message: 'Sản phẩm đã kích hoạt bảo hành',
        textConfirm: 'Xem chi tiết',
        textCancel: 'Quét tiếp',
      });
      if (res) {
        navigationRef.navigate('ActiveStatus', {qrCode: product.qrcode});
      }
      return;
    }
    await confirmProduct(product);
  };

  const handleActiveGeneral = async (product: ProductInfo) => {
    if (product.warrantied_at) {
      const res = await confirm({
        title: 'Đã kích hoạt',
        message: 'Sản phẩm đã kích hoạt',
        textConfirm: 'Xem chi tiết',
        textCancel: 'Quét tiếp',
      });
      if (res) {
        navigationRef.navigate('ActiveStatus', {qrCode: product.qrcode});
      }
      return;
    }
    await confirmProduct(product);
  };

  useEffect(() => {
    if (productInfo.data) {
      (async () => {
        if (scannedProducts.find(p => p.qrcode === productInfo.data.qrcode)) {
          return;
        }
        waitingConfirm.current = true;
        switch (route.params.type) {
          case ScanType.WARRANTY:
            await handleActiveWarranty(productInfo.data);
            break;
          case ScanType.SALE:
            await handleActiveSale(productInfo.data);
            break;
          case ScanType.LOOK_UP:
            navigationRef.navigate('ActiveResult', {
              data: [productInfo.data],
              type: ActiveType.WARRANTY,
              isViewOnly: true,
            });
            break;
          case ScanType.GENERAL:
            await handleActiveGeneral(productInfo.data);
            break;
          default:
            break;
        }
        setTimeout(() => {
          waitingConfirm.current = false;
        }, 1500);
      })();
    }
  }, [productInfo.data]);

  useEffect(() => {
    if (!isFocused) {
      setQrCode(undefined);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(result => {
        if (!result) {
          setUserDeniedPermission(true);
        }
      });
    }
  }, [hasPermission]);

  const renderHeader = () => {
    return (
      <Block height={62.3 + top} safePaddingTop position="absolute" width={'100%'}>
        <Block flex paddingHorizontal={15} rowCenter>
          <Pressable
            round={40}
            onPress={navigationRef.goBack}
            contentCenter
            paddingHorizontal={2}
            backgroundColor={COLORS.blackTransparent40}>
            <Icon type="FontAwesome6" name="arrow-left" size={20} color={COLORS.white} />
          </Pressable>
          <Block flex contentCenter>
            <Block
              backgroundColor={COLORS.blackTransparent40}
              paddingHorizontal={15}
              paddingVertical={5}
              radius={100}>
              <Text
                textAlign="center"
                color={COLORS.white}
                font={'bold'}
                fontSize={18}
                numberOfLines={1}>
                {HEADER_TITLE[route.params.type]}
              </Text>
            </Block>
          </Block>
          <Block square={40} />
        </Block>
      </Block>
    );
  };

  if (!hasPermission) {
    return (
      <Block flex backgroundColor={COLORS.black}>
        {renderHeader()}
        {userDeniedPermission ? (
          <Block flex justifyContent="center">
            <Text
              color={COLORS.white}
              marginHorizontal={16}
              fontSize={18}
              textAlign="center"
              font="bold">
              {'Để sử dụng chức năng quét Mã,\nVui lòng cấp quyền sử dụng camera'}
            </Text>
            <Pressable
              onPress={Linking.openSettings}
              backgroundColor={COLORS.white}
              paddingVertical={10}
              paddingHorizontal={10}
              radius={8}
              marginTop={10}
              alignSelf="center">
              <Text>{'Đi đến cài đặt'}</Text>
            </Pressable>
          </Block>
        ) : null}
      </Block>
    );
  }

  return (
    <Block flex>
      {device && (
        <Camera
          device={device}
          style={StyleSheet.absoluteFillObject}
          isActive={isFocused}
          codeScanner={codeScanner}
        />
      )}
      <Block flex>
        {renderHeader()}
        <Block flex>
          {/* <Pressable height={100} onPress={demo} backgroundColor={'gold'} /> */}
        </Block>
        <Block contentCenter>
          <QrMask strokeLength={37} />
          {productInfo.isFetching && (
            <Block absoluteFillObject contentCenter>
              <ActivityIndicator size={'large'} color={COLORS.white} />
            </Block>
          )}
        </Block>
        <Block flex>
          {productInfo.error ? (
            <Block
              rowCenter
              backgroundColor={COLORS.white}
              marginTop={16}
              radius={8}
              padding={10}
              alignSelf="center">
              <Icon type="FontAwesome6" name={'circle-exclamation'} color={COLORS.red} size={16} />
              <Text marginHorizontal={8}>
                {productInfo.error.response?.data.message || 'Sản phẩm không hợp lệ'}
              </Text>
              {/* <Icon type="EvilIcons" name="close" /> */}
            </Block>
          ) : null}
          {scannedProducts.length > 0 && (
            <Pressable
              onPress={() => onCartPress()}
              position="absolute"
              round={51}
              left={18}
              bottom={bottom + 18}
              backgroundColor={COLORS.primary}
              contentCenter>
              <Icon type="SimpleLineIcons" name="handbag" color={COLORS.white} size={22} />

              <Block
                position="absolute"
                round={17}
                backgroundColor={COLORS.red}
                contentCenter
                top={1}
                left={1}>
                <Text fontSize={8} color={COLORS.white}>
                  {scannedProducts.length}
                </Text>
              </Block>
            </Pressable>
          )}
        </Block>
      </Block>
    </Block>
  );
}
