import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {ApiResponse, PagingResponseData} from 'models/common';
import {ListScanned} from 'models/profile';
import {useAppStore} from 'stores';
import api from 'util/api';
import {sleep} from 'util/helper';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (body: {password_old: string; password: string}) => {
      const res = await api.postRaw<ApiResponse>('auth/changePassword', {
        ...body,
      });
      return res;
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async (password: string) => {
      const savedPass = useAppStore.getState().accountSaved?.password;
      if (savedPass !== password) {
        await sleep(1000);
        throw new Error('Mật khẩu không đúng');
      }
      const res = await api.delete<ApiResponse>('user/delete');
      return res;
    },
    onSuccess: () => {
      useAppStore.setState({accessToken: undefined, accountSaved: undefined});
    },
  });
};

export const useGetListScanned = ({type}: {type: 'active' | 'warranty'}) => {
  const getNewsAll = async ({pageParam}: {pageParam: number}) => {
    const data = await api.get<PagingResponseData<ListScanned[]>>('/product/list-scanned', {
      type: type,
      page: pageParam + 1,
      limit: 10,
    });
    return data;
  };
  return useInfiniteQuery({
    queryKey: ['ListScanned', type],
    queryFn: getNewsAll,
    initialPageParam: 0,
    getNextPageParam: pages => {
      if (pages.data.last_page === pages.data.current_page) {
        return undefined;
      }
      return pages.data.current_page;
    },
  });
};
