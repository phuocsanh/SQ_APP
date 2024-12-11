import {queryOptions, useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {PagingResponseData, ResponseData} from 'models/common';
import {NewsData, NewsDetailData} from 'models/other';
import api from 'util/api';

export const useGetNewsAllData = ({keyword}: {keyword?: string}) => {
  const getNewsAll = async ({pageParam}: {pageParam: number}) => {
    const data = await api.get<PagingResponseData<NewsData>>('/news/list', {
      keyword: keyword || null,
      page: pageParam + 1,
      limit: 10,
    });
    return data;
  };
  return useInfiniteQuery({
    queryKey: ['getNewsAllData', keyword],
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

export const useGetNewsDetail = (id: string) => {
  return useQuery({
    queryKey: ['newDetail', id],
    queryFn: async () => {
      const res = await api.get<ResponseData<NewsDetailData>>(`/news/detail/${id}`);

      return res.data;
    },
  });
};

export const useGetNewsData = () => {
  const getNews = async ({pageParam}: {pageParam: number}) => {
    const data = await api.get<PagingResponseData<NewsData>>(
      '/news/list?orderBy=is_focus&is_desc=true',
      {
        page: pageParam + 1,
        limit: 10,
      },
    );
    return data;
  };
  return useInfiniteQuery({
    queryKey: ['getNewsData'],
    queryFn: getNews,
    initialPageParam: 0,
    getNextPageParam: pages => {
      if (pages.data.last_page === pages.data.current_page) {
        return undefined;
      }
      return pages.data.current_page;
    },
  });
};
