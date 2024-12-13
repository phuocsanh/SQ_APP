import {useQuery} from '@tanstack/react-query';
import {ResponseData} from 'models/common';
import {Banner} from 'models/other';
import api from 'util/api';

export const useGetBanner = () => {
  return useQuery({
    queryKey: ['getBanner'],
    queryFn: async () => {
      const res = await api.get<ResponseData<Banner[]>>('/banner', {type_app: 'APP'});

      return res;
    },
  });
};
