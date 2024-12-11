import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {Nunito} from 'assets';
import {Block, CheckBox, HeaderTitle, List, Pressable, Text} from 'components';
import {ActiveType} from 'models/other';
import {ProductInfo} from 'models/products';
import {RootStackNavigationProps} from 'navigation';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, hs} from 'theme';
import ProductItem from './components/ProductItem';

type TabParamList = {sale: {data: ProductInfo[]}; warranty: {data: ProductInfo[]}};

const Tabs = createMaterialTopTabNavigator<TabParamList>();

type ScreenProps = StaticScreenProps<{products: ProductInfo[]}>;

const ListActiveProductTab = ({route}: MaterialTopTabScreenProps<TabParamList>) => {
  const isWarranty = route.name === 'warranty';
  const {bottom} = useSafeAreaInsets();
  const [products, setProducts] = useState<(ProductInfo & {selected?: boolean})[]>(
    route.params.data.filter(p => (isWarranty ? p.actived_at : !p.actived_at)),
  );
  const navigation = useNavigation<RootStackNavigationProps>();
  const selectedProducts = products.filter(p => p.selected);

  const isSelectedAll = selectedProducts.length === products.length;

  const onSelectAll = () => {
    setProducts(products.map(p => ({...p, selected: !isSelectedAll})));
  };

  const onSelect = (qrCode: string) => {
    setProducts(
      products.map(p => ({...p, selected: qrCode === p.qrcode ? !p.selected : p.selected})),
    );
  };

  const onDelete = (qrCode: string) => {
    setProducts(products.filter(p => p.qrcode !== qrCode));
  };

  const onActive = () => {
    if (isWarranty) {
      navigation.replace('WarrantyActivation', {products: selectedProducts});
    } else {
      navigation.replace('ActiveResult', {
        data: selectedProducts,
        type: ActiveType.SALE,
      });
    }
  };

  return (
    <Block flex backgroundColor={COLORS.aliceBlue}>
      {products.length > 0 && (
        <Block row marginTop={14} paddingHorizontal={16}>
          <Text flex>{`Tổng sản phẩm ${products.length}`}</Text>
          <Pressable activeOpacity={1} row onPress={onSelectAll}>
            <CheckBox disabled size={20} isCheck={isSelectedAll} />
            <Text marginLeft={6} font="semiBold" fontSize={16} color={COLORS.philippineGray1}>
              {'Tất cả'}
            </Text>
          </Pressable>
        </Block>
      )}
      <List
        style={{paddingHorizontal: hs(16)}}
        keyExtract="qrcode"
        data={products}
        renderItem={({item}) => <ProductItem item={item} onSelect={onSelect} onDelete={onDelete} />}
      />
      {products.length > 0 && (
        <Block
          backgroundColor={COLORS.white}
          paddingBottom={bottom || 20}
          paddingTop={18}
          paddingHorizontal={16}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}>
          <Pressable
            onPress={onActive}
            disabled={!selectedProducts.length}
            backgroundColor={selectedProducts.length ? COLORS.primary : COLORS.brightGray}
            radius={40}
            paddingVertical={11}
            contentCenter>
            <Text font="semiBold" fontSize={16} color={COLORS.white}>
              {'Kích hoạt'}
            </Text>
          </Pressable>
        </Block>
      )}
    </Block>
  );
};

export default function ListActiveProductScreen({route}: ScreenProps) {
  const haveSale = route.params.products.some(p => !p.actived_at);
  return (
    <Block flex backgroundColor={COLORS.white}>
      <HeaderTitle title="Kích hoạt sản phẩm" />
      <Tabs.Navigator
        backBehavior="history"
        initialRouteName={haveSale ? 'sale' : 'warranty'}
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
          tabBarStyle: {backgroundColor: COLORS.aliceBlue},
          tabBarLabelStyle: {fontSize: 18, fontFamily: Nunito.regular},
          swipeEnabled: false,
        }}>
        <Tabs.Screen
          name="sale"
          initialParams={{data: route.params.products}}
          component={ListActiveProductTab}
          options={{title: 'Bán hàng'}}
        />
        <Tabs.Screen
          name="warranty"
          initialParams={{data: route.params.products}}
          component={ListActiveProductTab}
          options={{title: 'Bảo hành'}}
        />
      </Tabs.Navigator>
    </Block>
  );
}
