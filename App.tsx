import React from 'react';
import {PortalHost, PortalProvider} from '@gorhom/portal';
import {RootNavigation} from 'navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {QueryClientProvider} from '@tanstack/react-query';
import {useReactQueryDevTools} from '@dev-plugins/react-query';
import {ModalConfirm, ModalUpdateApp} from 'components';
import {queryClient} from 'queries';
import {CustomToast} from 'components/common/CustomToast';

export default function App() {
  useReactQueryDevTools(queryClient);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <PortalProvider>
            <StatusBar />
            <RootNavigation />
            <PortalHost name="root" />
          </PortalProvider>
          <ModalConfirm />
          <CustomToast />
          <ModalUpdateApp />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
