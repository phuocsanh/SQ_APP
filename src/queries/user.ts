import {queryOptions, useQuery} from '@tanstack/react-query';
import {ResponseData} from 'models/common';
import {UserInfo} from 'models/user';
import {useAppStore} from 'stores';
import api from 'util/api';

export const userInfoOption = (userToken?: string) => {
  const token = userToken || useAppStore.getState().userToken;
  return queryOptions({
    queryKey: ['userInfo', token],
    queryFn: async () => {
      const res = await api.get<ResponseData<UserInfo>>('user/info');
      return res.data;
    },
    enabled: !!token,
  });
};

export const useQueryUserInfo = () => {
  const userToken = useAppStore(state => state.userToken);
  return useQuery(userInfoOption(userToken));
};
