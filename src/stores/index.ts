import {FcmMessage} from 'models/common';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import persistStorage from './persistStorage';
import {ProductInfo} from 'models/products';

type Store = {
  accessToken?: string;
  refeshToken?: string;
  userId?: string;
  navigationReady: boolean;
  fcmMessage?: FcmMessage;
  saveAccount?: boolean;
  accountSaved?: {
    email: string;
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
        accessToken: state.accessToken,
        refeshToken: state.refeshToken,
        userId: state.userId,
        saveAccount: state.saveAccount,
        accountSaved: state.accountSaved,
      }),
    },
  ),
);
