import notifee, {AndroidChannel, AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {FcmMessage} from 'models/common';
import {useEffect, useState} from 'react';
import {useAppStore} from 'stores';

export const onMessagePress = (message: FcmMessage, isForeground?: boolean) => {
  if (__DEV__) {
    console.log('FIREBASE_MESSAGE_ON_PRESS:', {message, isForeground});
  }
};

export const handleBackgroundMessage = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (__DEV__) {
      console.log(
        '%c FIREBASE_MESSAGE_NOTIFICATION_FROM_BACKGROUND: ',
        'color: yellow; font-weight: bold',
        remoteMessage,
      );
    }
  });
};

async function displayNotification(message: FcmMessage) {
  try {
    // todo: check again in future if "sound" still insdie "notification"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: sound not in notification
    const sound = (message.notification?.ios?.sound || message.notification?.sound) as
      | string
      | undefined;
    if (sound) {
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        data: message.data,
        android: {
          channelId: message.notification?.android?.channelId || 'default_app',
          pressAction: {
            id: 'default',
          },
        },
        ios: {sound},
      });
    } else {
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        data: message.data,
        android: {
          channelId: message.notification?.android?.channelId || 'default_app',
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  } catch {}
}

const ANDROID_NOTIFICATION_CHANNEL: AndroidChannel[] = [
  {
    id: 'default_app',
    bypassDnd: true,
    importance: AndroidImportance.HIGH,
    name: 'Thông báo chung',
    sound: 'default',
  },
];

const useNotificationListener = () => {
  const isReady = useAppStore(state => state.navigationReady);

  const [fMessage, setMessage] = useState<FcmMessage>();

  useEffect(() => {
    if (isReady && fMessage) {
      onMessagePress(fMessage);
    }
  }, [isReady, fMessage]);

  useEffect(() => {
    notifee.createChannels(ANDROID_NOTIFICATION_CHANNEL);

    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS: {
          const dataMessage = {
            messageId: detail.notification?.id,
            notification: {
              body: detail.notification?.body,
              title: detail.notification?.title,
            },
            data: detail.notification?.data as FcmMessage['data'],
            fcmOptions: {},
          };
          if (!isReady) {
            setMessage(dataMessage);
          } else {
            onMessagePress(dataMessage, true);
          }
          break;
        }
      }
    });

    messaging().onNotificationOpenedApp(message => {
      onMessagePress(message as FcmMessage);
    });
    messaging()
      .getInitialNotification()
      .then(message => {
        if (message) {
          setMessage(message as FcmMessage);
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onMessageListener = messaging().onMessage(message => {
      if (__DEV__) {
        console.log('FIREBASE_MESSAGE_FORE_GROUND:', message);
      }
      const fMess = message as FcmMessage;
      if (fMess.data?.show_on_foreground !== '0') {
        displayNotification(fMess);
      }
      useAppStore.setState({fcmMessage: fMess});
    });
    return onMessageListener;
  }, []);
};

export default useNotificationListener;
