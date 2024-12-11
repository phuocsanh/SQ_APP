import {LOTTIES} from 'assets';
import LottieView from 'lottie-react-native';
import React, {ElementType, ForwardedRef, Ref, forwardRef, useCallback} from 'react';
import {ActivityIndicator, FlatList, FlatListProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block} from '../Block';
import {Loading} from '../Loading';
import {Text} from '../Text';

type ListProps<T> = FlatListProps<T> & {
  keyExtract?: keyof T;
  isLoading?: boolean;
  isLoadmore?: boolean;
  emptyPlaceholderTitle?: string;
  /**
   * - undefined (default): render default EmptyPlaceholder with emptyPlaceholderTitle
   * - null: not render EmptyPlaceholder
   * - custom: custom EmptyPlaceholder
   */
  EmptyPlaceholderComponent?: ElementType | null;
  LoadingComponent?: ElementType | null;
  safeBottomContent?: number | boolean;
  paddingTopContent?: number;
  backgroundColor?: string;
  numColumns?: number;
  ref?: ForwardedRef<FlatList<T>>;
};

const ListInner = <T,>(
  {
    keyExtract,
    isLoading,
    isLoadmore,
    emptyPlaceholderTitle,
    LoadingComponent,
    EmptyPlaceholderComponent,
    ref: _refNotInUse,
    safeBottomContent = true,
    paddingTopContent,
    backgroundColor,
    contentContainerStyle,
    numColumns,
    ...props
  }: ListProps<T>,
  ref: Ref<FlatList<T>>,
) => {
  const {bottom} = useSafeAreaInsets();

  const keyExtractor = useCallback((item: T, index: number) => {
    if (keyExtract) {
      return `${item[keyExtract]}`;
    } else {
      return `${index}`;
    }
  }, []);

  const renderFooter = useCallback(() => {
    return isLoadmore ? (
      <Block height={50} contentCenter>
        <ActivityIndicator size="large" />
      </Block>
    ) : null;
  }, [isLoadmore]);

  const renderLoading = useCallback(() => {
    return LoadingComponent ? <LoadingComponent /> : <Loading />;
  }, []);

  const renderEmpty = useCallback(() => {
    return props.data?.length === 0 && !isLoading ? (
      EmptyPlaceholderComponent ? (
        <EmptyPlaceholderComponent />
      ) : EmptyPlaceholderComponent === undefined ? (
        <EmptyPlaceholder title={emptyPlaceholderTitle} />
      ) : null
    ) : null;
  }, [emptyPlaceholderTitle, isLoading, props.data?.length]);

  return isLoading ? (
    renderLoading()
  ) : (
    <FlatList
      contentContainerStyle={[
        {
          backgroundColor,
          paddingTop: paddingTopContent,
          paddingBottom: safeBottomContent
            ? safeBottomContent === true
              ? bottom
              : safeBottomContent
            : undefined,
        },
        contentContainerStyle,
      ]}
      onEndReachedThreshold={0.5}
      keyExtractor={keyExtractor}
      ref={ref}
      numColumns={numColumns}
      refreshing={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      {...props}
    />
  );
};

const EmptyPlaceholder = ({
  width = 200,
  height = 200,
  title = 'Không có dữ liệu',
}: {
  width?: number;
  height?: number;
  title?: string;
}) => {
  return (
    <Block flex justifyContent="center" alignItems="center">
      <LottieView loop autoPlay source={LOTTIES.empty} style={{width: width, height: height}} />
      <Text>{title}</Text>
    </Block>
  );
};

export const List = forwardRef(ListInner) as <T>(
  props: ListProps<T>,
) => ReturnType<typeof ListInner>;
