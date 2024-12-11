import {Platform} from 'react-native';

export const BUILD_VERSION = '1624.1012';

export const IS_IOS = Platform.OS === 'ios';

export const PHONE_REGEX = /^(84|0)(3|5|7|8|9)([0-9]{8})$/;
