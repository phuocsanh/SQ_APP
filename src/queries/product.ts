import {queryOptions, useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {PagingResponseData, ResponseData} from 'models/common';
import {ActiveType} from 'models/other';
import {
  ActiveProductResult,
  ProductBanner,
  ProductDetail,
  ProductGroupItem,
  ProductInfo,
  ProductItem,
  ProductType,
} from 'models/products';
import {queryClient} from 'queries';
import {useAppStore} from 'stores';
import api from 'util/api';

export const useGetProductDetail = ({id}: {id: number}) => {
  return useQuery({
    queryKey: ['getProductDetail', id],
    queryFn: async () => await api.get<ResponseData<ProductDetail>>(`/product/detail/${id}`),
  });
};

export const useGetListProductTopDiscount = ({
  product_type,
  keyword,
}: {
  product_type?: ProductType;
  keyword?: string;
}) => {
  const getListProductTopDiscount = async ({pageParam}: {pageParam: number}) => {
    const data = await api.get<PagingResponseData<ProductItem>>('/product/getProductsByDiscount', {
      product_type,
      keyword,
      page: pageParam,
      limit: 10,
    });
    return data;
  };
  return useInfiniteQuery({
    queryKey: ['getListProductTopDiscount', keyword, product_type],
    queryFn: getListProductTopDiscount,
    initialPageParam: 1,
    getNextPageParam: pages => {
      if (pages.data.currentPage >= pages.data.totalPages) {
        return undefined;
      }
      return pages.data.currentPage + 1;
    },
  });
};
export const useGetListProductBySelled = ({
  product_type,
  keyword,
}: {
  product_type?: ProductType;
  keyword?: string;
}) => {
  const getListProductBySelled = async ({pageParam}: {pageParam: number}) => {
    const data = await api.get<PagingResponseData<ProductItem>>('/product/getProductsBySelled', {
      product_type,
      keyword,
      page: pageParam,
      limit: 10,
    });
    return data;
  };
  return useInfiniteQuery({
    queryKey: ['getListProductBySelled', keyword, product_type],
    queryFn: getListProductBySelled,
    initialPageParam: 1,
    getNextPageParam: pages => {
      if (pages.data.currentPage >= pages.data.totalPages) {
        return undefined;
      }
      return pages.data.currentPage + 1;
    },
  });
};

export const useGetListProductGroup = () => {
  return useQuery({
    queryKey: ['getProductGroups'],
    queryFn: async () => await api.get<ResponseData<ProductGroupItem[]>>('/product/group'),
  });
};

export const useGetProductBanner = () => {
  return useQuery({
    queryKey: ['getProductBanner'],
    queryFn: async () =>
      await api.get<ResponseData<ProductBanner[]>>('/banner', {
        group: 'banner-product',
      }),
  });
};

export const productInfoOption = (code?: string) => {
  return queryOptions({
    queryKey: ['productInfo', code],
    queryFn: async () => {
      const res = await api.get<ResponseData<ProductInfo>>('product/info', {code});
      return res.data;
    },
    enabled: !!code,
    retry: false,
  });
};

export const useActiveProducts = () => {
  return useMutation({
    mutationFn: async (
      body:
        | {
            codes: string[];
            type: ActiveType.SALE;
          }
        | {
            codes: string[];
            type: ActiveType.WARRANTY;
            customer_name: string;
            customer_phone: string;
            customer_email: string;
            customer_address: string;
            customer_province: string;
            customer_district: string;
          },
    ) => {
      const res = await api.postRaw<ResponseData<ActiveProductResult>>(
        'product/active-by-code',
        body,
      );
      return res.data;
    },
    onSuccess: (_, body) => {
      queryClient.refetchQueries({
        predicate: query =>
          query.queryKey[0] === productInfoOption().queryKey[0] &&
          typeof query.queryKey[1] === 'string' &&
          body.codes.includes(query.queryKey[1]),
      });
    },
    onSettled: () => {
      useAppStore.setState({scannedProducts: []});
    },
  });
};
