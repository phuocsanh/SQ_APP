import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {AxiosError} from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = {[key: string]: any};

export type ApiResponse = {
  code: number;
  message: string;
};

export const isApiResponse = (err: unknown): err is ApiResponse => {
  if (err && typeof err === 'object' && 'code' in err && 'message' in err) {
    return true;
  }
  return false;
};

export type ErrorConfirmBooking = {
  code: number;
  message: {
    error_code?: number;
    mess?: string;
  };
};

export const isErrorConfirmBooking = (err: unknown): err is ErrorConfirmBooking => {
  if (
    err &&
    typeof err === 'object' &&
    'code' in err &&
    'message' in err &&
    err.message &&
    typeof err.message === 'object' &&
    'error_code' in err.message
  ) {
    return true;
  }
  return false;
};
export type ResponseData<D> = ApiResponse & {
  data: D;
};

export type AppAxiosError = AxiosError<
  ApiResponse & {
    data?: AnyObject;
  }
>;

type Paging = {
  p?: number;
  limit?: number;
};

export type PagingParams<P = void> = P extends void ? Paging | void : Paging & P;

export type PagingResponseData<D> = ApiResponse & {
  data: {
    totalPages: number;
    total: number;
    currentPage: number;
    data: D[];
  };
  //from:number;
  //to:number;
};

export type Timeout = ReturnType<typeof setTimeout>;

export type Interval = ReturnType<typeof setInterval>;

export type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

export const enum Gender {
  FEMALE,
  MALE,
}

export const enum Bool {
  NO,
  YES,
}

export type FcmMessage = Omit<FirebaseMessagingTypes.RemoteMessage, 'data'> & {
  data?: {
    _id: string;
    show_on_foreground?: '1' | '0';
    type?: string;
  };
};
