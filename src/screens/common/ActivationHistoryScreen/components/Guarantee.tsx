import {Block, List, Text} from 'components';
import React from 'react';
import {COLORS} from 'theme';
import ItemTab from './ItemTab';
import {useGetListScanned} from 'queries/profile';
import {ListScanned} from 'models/profile';
import ShimmerItemTab from './ShimmerItemTab';

const Guarantee = () => {
  const {data, isPending, refetch, fetchNextPage, hasNextPage} = useGetListScanned({
    type: 'warranty',
  });
  const newData = data?.pages.map(page => page.data.data).flat();
  const total = data?.pages.map(page => page.data.total).flat();

  const onEndReached = () => {
    if (hasNextPage && !isPending) {
      fetchNextPage();
    }
  };

  return (
    <Block backgroundColor={COLORS.aliceBlue} flex>
      <Text fontSize={16} font="bold" color={COLORS.black}>
        {'Tổng Sản Phẩm '}
        <Text fontSize={16} font={'semiBold'} color={COLORS.black}>
          {total && total.length > 0 ? `(${total[0]})` : '(0)'}
        </Text>
      </Text>
      <List
        isLoadmore={hasNextPage}
        onEndReached={onEndReached}
        onRefresh={refetch}
        data={newData || []}
        isLoading={isPending}
        LoadingComponent={ShimmerItemTab}
        renderItem={({item, index}: {item: ListScanned; index: number}) => (
          <ItemTab item={item} type={'warranty'} index={index} />
        )}
      />
    </Block>
  );
};

export default Guarantee;
