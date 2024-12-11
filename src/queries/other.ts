import {useQuery} from '@tanstack/react-query';
import {ResponseData} from 'models/common';
import api from 'util/api';

export const useGetProvince = () => {
  return useQuery({
    queryKey: ['getProvince'],
    queryFn: async () => {
      const res = await api.get<ResponseData<{title: string; code: string}[]>>('get-province');
      return res;
    },
  });
};

export const useQueryProvince = () => {
  return useQuery({
    queryKey: ['getProvince'],
    queryFn: async () => {
      const res = await api.get<ResponseData<{title: string; code: string}[]>>('get-province');
      return res.data;
    },
  });
};

export const useQueryDistrict = (province_code?: string) => {
  return useQuery({
    queryKey: ['getDistrict', province_code],
    queryFn: async () => {
      const res = await api.get<ResponseData<{title: string; code: string}[]>>('get-district', {
        province_code,
      });
      return res.data;
    },
    enabled: !!province_code,
  });
};

export const useGetDistrict = ({province_code}: {province_code: number}) => {
  return useQuery({
    queryKey: ['getDistrict', province_code],
    queryFn: async () => {
      const res = await api.get<ResponseData<{title: string; code: string}[]>>('/get-district', {
        province_code: province_code,
      });
      return res;
    },
    enabled: province_code > 0,
  });
};

export const useGetWard = ({
  province_code,
  district_code,
}: {
  province_code: number;
  district_code: number;
}) => {
  return useQuery({
    queryKey: ['useGetWard', district_code],
    queryFn: async () => {
      const res = await api.get<ResponseData<{title: string; code: string}[]>>('/get-ward', {
        province_code: province_code,
        district_code: district_code,
      });
      return res;
    },
    enabled: province_code > 0 && district_code > 0,
  });
};
