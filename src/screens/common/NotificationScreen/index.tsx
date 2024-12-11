import {Block, HeaderTitleNoBackground, List} from 'components';
import React from 'react';
import {COLORS} from 'theme';
import ItemList from './ItemList';
import {useGetNotifications} from 'queries/notification';
import ShimmerNoti from './ShimmerNoti';

export default function NotificationScreen() {
  const {data, isPending, hasNextPage, refetch, fetchNextPage} = useGetNotifications(true);
  const newData = data?.pages.flatMap(page => page.data.data);
  const onEndReached = () => {
    if (hasNextPage && !isPending) {
      fetchNextPage();
    }
  };
  return (
    <Block flex backgroundColor={COLORS.bgSuccess}>
      <HeaderTitleNoBackground title="Thông Báo" canGoBack />
      <Block flex backgroundColor={COLORS.white}>
        <List
          isLoadmore={hasNextPage}
          onEndReached={onEndReached}
          onRefresh={refetch}
          data={newData || []}
          isLoading={isPending}
          LoadingComponent={ShimmerNoti}
          keyExtract="item_id"
          renderItem={({item, index}) => <ItemList item={item} index={index} />}
        />
      </Block>
    </Block>
  );
}
