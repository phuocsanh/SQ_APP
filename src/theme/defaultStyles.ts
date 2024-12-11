import {StyleSheet} from 'react-native';
import {COLORS} from './color';

export const DEFAULT_STYLES = StyleSheet.create({
  row: {flexDirection: 'row'},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  contentCenter: {justifyContent: 'center', alignItems: 'center'},
  wrap: {flexWrap: 'wrap'},
  absoluteFillObject: StyleSheet.absoluteFillObject,
  sheetContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 12,
  },
  shadow1: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  shadow2: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  shadow3: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadow4: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  shadow5: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadow6: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.raisinBlack,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  shadow7: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.raisinBlack,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  shadow8: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.raisinBlack,
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 10,
  },
  shadowCenter: {
    shadowColor: COLORS.raisinBlack,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
    elevation: 10,
  },
});
