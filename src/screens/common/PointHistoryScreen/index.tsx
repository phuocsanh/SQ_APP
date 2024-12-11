import {Block, HeaderTitleNoBackground, Image, List, Text} from 'components';
import React from 'react';
import Item from './Item';
import {COLORS} from 'theme';
import {useGetPointHistory} from 'queries/point';
import {useQueryUserInfo} from 'queries/user';
import {ICONS} from 'assets';
import ShimmerPointHistory from './ShimmerPointHistory';

const HistoryScreen = () => {
  const {data, isPending, hasNextPage, fetchNextPage, refetch} = useGetPointHistory();
  const newData = data?.pages.map(page => page.data.data).flat();
  const {data: infoUser} = useQueryUserInfo();
  const onLoadMore = () => {
    if (hasNextPage && !isPending) {
      fetchNextPage();
    }
  };
  return (
    <Block flex backgroundColor={COLORS.antiFlashWhite}>
      <HeaderTitleNoBackground title="Lịch Sử Điểm" />
      <Block>
        {infoUser && infoUser.point > 0 && (
          <Block marginLeft={15} marginTop={15} rowCenter>
            <Image contentFit="fill" marginHorizontal={5} source={ICONS.ic_point} square={16} />
            <Text fontSize={16} font="bold">
              Tổng Điểm: <Text font="medium">{infoUser.point} Point</Text>
            </Text>
          </Block>
        )}

        <List
          data={newData || []}
          isLoading={isPending}
          isLoadmore={hasNextPage}
          onEndReached={onLoadMore}
          onRefresh={refetch}
          LoadingComponent={ShimmerPointHistory}
          renderItem={({item, index}) => (
            <Item item={item} index={index} length={newData?.length || 0} />
          )}
        />
      </Block>
    </Block>
  );
};

export default HistoryScreen;
