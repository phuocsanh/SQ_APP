import {QueryClient} from '@tanstack/react-query';
import '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ApiResponse} from 'models/common';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiResponse & {data?: unknown}>;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {staleTime: 5 * 60 * 1000, gcTime: 60 * 60 * 1000},
  },
});
