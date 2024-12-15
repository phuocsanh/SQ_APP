import {queryOptions, useQuery} from '@tanstack/react-query';
import {ResponseData} from 'models/common';
import {UserInfo} from 'models/user';
import {useAppStore} from 'stores';
import api from 'util/api';

export const userInfoOption = (userToken?: string) => {
  const token = userToken || useAppStore.getState().accessToken;
  return queryOptions({
    queryKey: ['getUserInfo', token],
    queryFn: async () => {
      const res = await api.get<ResponseData<UserInfo>>('user/getUserInfo');
      return res.data;
    },
    enabled: !!token,
  });
};

export const useQueryUserInfo = () => {
  const userToken = useAppStore(state => state.accessToken);
  return useQuery(userInfoOption(userToken));
};
