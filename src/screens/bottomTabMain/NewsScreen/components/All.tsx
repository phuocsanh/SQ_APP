import {Block, List} from 'components';
import {useGetNewsAllData} from 'queries/news';
import React from 'react';
import {COLORS} from 'theme';
import ItemTab from './ItemTab';
import ShimmerItemTab from './ShimmerItemTab';

const All = () => {
  const {data, isPending, refetch, fetchNextPage, hasNextPage} = useGetNewsAllData({
    keyword: undefined,
  });
  const newData = data?.pages.map(page => page.data.data).flat();

  const onEndReached = () => {
    if (hasNextPage && !isPending) {
      fetchNextPage();
    }
  };

  return (
    <Block backgroundColor={COLORS.aliceBlue} flex>
      <List
        isLoadmore={hasNextPage}
        onEndReached={onEndReached}
        onRefresh={refetch}
        data={newData || []}
        isLoading={isPending}
        LoadingComponent={ShimmerItemTab}
        renderItem={({item, index}) => <ItemTab item={item} index={index} />}
      />
    </Block>
  );
};

export default All;
