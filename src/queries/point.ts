import {useInfiniteQuery} from '@tanstack/react-query';
import {PagingResponseData} from 'models/common';
import {PointHistoryItem} from 'models/pointHistotry';
import api from 'util/api';

export const useGetPointHistory = () => {
  const getPointHistory = async ({pageParam}: {pageParam: number}) => {
    const data = await api.get<PagingResponseData<PointHistoryItem & {total_point: number}>>(
      '/user/get-point-log',
      {
        page: pageParam + 1,
        limit: 10,
      },
    );
    return data;
  };
  return useInfiniteQuery({
    queryKey: ['getPointHistory'],
    queryFn: getPointHistory,
    initialPageParam: 0,
    getNextPageParam: pages => {
      if (pages.data.last_page === pages.data.current_page) {
        return undefined;
      }
      return pages.data.current_page;
    },
  });
};
