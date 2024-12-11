import {MMKV} from 'react-native-mmkv';
import {createJSONStorage, StateStorage} from 'zustand/middleware';

const mmkvStorage = new MMKV({id: 'persist'});

const storage: () => StateStorage = () => {
  return {
    setItem: (name, value) => {
      return mmkvStorage.set(name, value);
    },
    getItem: name => {
      const value = mmkvStorage.getString(name);
      return value ?? null;
    },
    removeItem: name => {
      return mmkvStorage.delete(name);
    },
  };
};

export default createJSONStorage(storage);
