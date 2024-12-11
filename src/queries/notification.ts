import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {ResponseData} from 'models/common';
import {NotificationDetail, NotificationItem} from 'models/notification';
import api from 'util/api';

export const useGetNotifiDetail = ({id}: {id: number}) => {
  return useQuery({
    queryKey: ['getNotifiDetail', id],
    queryFn: async () =>
      await api.get<ResponseData<NotificationDetail>>(`/user/detail-notification/${id}`),
  });
};
export const useGetNotifications = () => {
  const getNotifications = async ({pageParam}: {pageParam: number}) => {
    const data = await api.get<{
      data: {
        last_page: number;
        total: number;
        per_page: number;
        current_page: number;
        data: NotificationItem[];
        total_unview: number;
        total_viewed: number;
      };
    }>('/user/list-notification', {
      page: pageParam + 1,
      limit: 10,
    });
    return data;
  };
  return useInfiniteQuery({
    queryKey: ['getNotifications'],
    queryFn: getNotifications,
    initialPageParam: 0,
    getNextPageParam: pages => {
      if (pages.data.last_page === pages.data.current_page) {
        return undefined;
      }
      return pages.data.current_page;
    },
  });
};
