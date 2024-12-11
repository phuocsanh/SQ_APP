import { Dimensions } from 'react-native';

export const DESIGN_WIDTH = 390;
export const DESIGN_HEIGHT = 844;

export const { width, height } = Dimensions.get('screen');

export const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

export const HEADER_HEIGHT = 120;

export const HEADER_TOP_OFFSET = 40;

export const URL_PICTURE =
  'http://192.168.1.49/sky/gateway/v1/media/api/uploads/';
