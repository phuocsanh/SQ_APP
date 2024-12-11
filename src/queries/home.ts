import {useQuery} from '@tanstack/react-query';
import {ResponseData} from 'models/common';
import {HomeData} from 'models/other';
import api from 'util/api';

export const useGetHomeData = () => {
  return useQuery({
    queryKey: ['getHomeData'],
    queryFn: async () => {
      const res = await api.get<ResponseData<HomeData>>('/home');
      return res;
    },
  });
};
