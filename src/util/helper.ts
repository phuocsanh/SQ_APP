/* eslint-disable no-bitwise */
// import {BASE_URL, LOCAL_URL} from './api';
import Constants from 'expo-constants';
import {BUILD_VERSION} from './constant';

type Coordinate = {latitude: number; longitude: number};

export const DEFAULT_LOCALES = 'vi-VN';
export const NUMBER_FORMAT = new Intl.NumberFormat(DEFAULT_LOCALES);

//TODO refactor
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function formatToK(number: number) {
  if (number >= 1000) {
    return (Math.floor(number / 100) / 10).toFixed(1).replace('.', ',') + 'k';
  }
  return number.toString();
}

export const removeUndefinedObject = (obj: any) => {
  Object.keys(obj).forEach(k => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k];
    }
    if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      removeUndefinedObject(obj[k]);
    }
  });
  return obj;
};

export const formatNumberWithDots = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const toCardNumberString = (value: string) => {
  let trimmed = value.replace(/[^\d]/g, '');
  if (trimmed) {
    trimmed = trimmed.match(/.{1,4}/g)?.join(' ') || '';
    if (trimmed.length > 19) {
      trimmed = trimmed.substring(0, 19);
    }
  }
  return trimmed;
};
export const replaceDot = (data = '') => {
  return +data.replace(/\./g, '');
};

export const convertMinutesToHour = (minutes = 0) => {
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    // Tính số phút còn lại bằng cách lấy phần dư của số phút khi chia cho 60
    const remainingMinutes = minutes % 60;
    return `${hours} giờ ${remainingMinutes} phút`;
  } else {
    return `${minutes} phút`;
  }
};

export const getDeviceIp = async () => {
  try {
    const {ip} = await (await fetch('https://api.ipify.org/?format=json')).json();
    return ip as string;
  } catch {
    return null;
  }
};

export function distanceBetween2Points(coord1: Coordinate, coord2: Coordinate) {
  //const p = 0.017453292519943295; // Math.PI / 180
  const p = Math.PI / 180;
  const c = Math.cos;
  const a =
    0.5 -
    c((coord2.latitude - coord1.latitude) * p) / 2 +
    (c(coord1.latitude * p) *
      c(coord2.latitude * p) *
      (1 - c((coord2.longitude - coord1.longitude) * p))) /
      2;
  const distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  return distance;
}

export function maskCardNumber(cardNumber: string) {
  const last4Digits = cardNumber.slice(-4);
  const maskedNumber = '**** ' + last4Digits;
  return maskedNumber;
}

export function idGenerate() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

export const removeAccents = (str = '') => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const searchIgnoreCase = (sourceString = '', searchString = '') => {
  if (!sourceString || !searchString) {
    return false;
  }
  return sourceString.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
};

export const searchIgnoreCaseAccent = (sourceString = '', searchString = '') => {
  if (!sourceString || !searchString) {
    return false;
  }
  return searchIgnoreCase(removeAccents(sourceString), removeAccents(searchString));
};

/**
 *
 * @param time miliseconds
 * @default 3000
 */
export const sleep = (time = 3000) => new Promise(r => setTimeout(r, time));

export const floorFloatNumber = (num: number, decimalPlaces = 3) => {
  const p = Math.pow(10, decimalPlaces);
  return Math.floor(num * p) / p;
};

// const checkResult = (result: string) => {
//   switch (result) {
//     case RESULTS.UNAVAILABLE:
//       throw 'This feature is not available';
//     case RESULTS.BLOCKED:
//       throw 'The permission is blocked';
//     case RESULTS.LIMITED:
//       throw 'The permission is granted but with limitations';
//     case RESULTS.DENIED:
//       if (__DEV__) {
//         console.log('The permission is denied and can be requested again');
//       }
//       return false;
//     case RESULTS.GRANTED:
//       return true;
//     default:
//       throw 'Unknown error';
//   }
// };

export const convertCurrency = (currency?: number, suffix = 'đ', locales = DEFAULT_LOCALES) => {
  const _formatter = locales === DEFAULT_LOCALES ? NUMBER_FORMAT : new Intl.NumberFormat(locales);
  return currency ? `${_formatter.format(currency)}${suffix}` : `0${suffix}`;
};

export const mapValueLabel = <T, KV extends keyof T, KL extends keyof T>(
  list: T[] | undefined,
  keyValue: KV,
  keyLabel: KL,
) => {
  return list?.map(x => ({
    ...x,
    value: x[keyValue],
    label: x[keyLabel],
  }));
};

export const displayVersion = () => {
  return `v.${Constants.expoConfig?.version || '1.0'}.${BUILD_VERSION}`;
};
