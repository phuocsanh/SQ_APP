import {FcmMessage} from 'models/common';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import persistStorage from './persistStorage';
import {ProductInfo} from 'models/products';

type Store = {
  userToken?: string;
  navigationReady: boolean;
  fcmMessage?: FcmMessage;
  saveAccount?: boolean;
  accountSaved?: {
    phone: string;
    password: string;
  };
  scannedProducts: ProductInfo[];
};

export const useAppStore = create<Store>()(
  persist(
    (_set, _get) => ({
      navigationReady: false,
      scannedProducts: [],
    }),
    {
      name: 'app-storage',
      storage: persistStorage,
      partialize: state => ({
        // Các trường sẽ được lưu lại sau khi reload app
        userToken: state.userToken,
        saveAccount: state.saveAccount,
        accountSaved: state.accountSaved,
      }),
    },
  ),
);
