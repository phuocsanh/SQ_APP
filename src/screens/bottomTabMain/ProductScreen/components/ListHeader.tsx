import React, {useEffect, useRef, useState} from 'react';
import {Block, Image, Pressable, Shimmer, Text} from 'components';
import {COLORS, rhs, width} from 'theme';
import {ScrollView} from 'react-native';
import {ProductGroupItem} from 'models/products';

const ListHeader = ({
  isLoadingProductBanner,
  isLoadingProductGroup,
  dataProductGroup,
  dataProductBanner,
  category,
  setCategory,
}: {
  isLoadingProductBanner: boolean;
  isLoadingProductGroup: boolean;
  dataProductGroup: ProductGroupItem[];
  dataProductBanner: string;
  setCategory: (id: number | null) => void;
  category: number | null;
}) => {
  const listProductGroup = [
    {
      group_id: null,
      title: 'Tất cả',
    },
    ...dataProductGroup,
  ];
  const scrollViewRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: index * 65,
        animated: true,
      });
    }, 100); // Đợi 100ms hoặc lâu hơn nếu cần
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <Block>
      <Block>
        {isLoadingProductBanner ? (
          <Block width={'100%'}>
            <Shimmer width={rhs(width - 30)} height={width * 0.4} />
          </Block>
        ) : (
          dataProductBanner && (
            <Image radius={8} source={dataProductBanner} width={'100%'} height={width * 0.4} />
          )
        )}
      </Block>
      <Block marginTop={35} flex backgroundColor={COLORS.white}>
        <Block>
          <Block rowCenter justifyContent="space-between">
            <Text fontSize={18} font="bold" color={COLORS.darkJungleGreen}>
              Danh mục
            </Text>
          </Block>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 25}}>
            {isLoadingProductGroup ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 20}}>
                {Array.from({length: 4}).map((item, index) => (
                  <Shimmer
                    key={index}
                    marginRight={15}
                    width={width / 4}
                    height={32}
                    radius={100}
                  />
                ))}
              </ScrollView>
            ) : listProductGroup.length > 0 ? (
              listProductGroup.map((item, index) => (
                <Pressable
                  marginTop={20}
                  contentCenter
                  marginRight={12}
                  height={32}
                  onPress={() => {
                    setIndex(index);
                    setCategory(item.group_id);
                  }}
                  radius={100}
                  borderWidth={1}
                  borderColor={category === item.group_id ? COLORS.primary : COLORS.philippineGray1}
                  key={index}
                  paddingHorizontal={12}>
                  <Text
                    font={category === item.group_id ? 'bold' : 'regular'}
                    fontSize={16}
                    color={category === item.group_id ? COLORS.primary : COLORS.philippineGray1}>
                    {item.title}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Block height={32} />
            )}
          </ScrollView>
        </Block>
      </Block>
    </Block>
  );
};

export default ListHeader;
