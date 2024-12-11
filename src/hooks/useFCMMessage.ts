import {FcmMessage} from 'models/common';
import {useEffect, useRef, useState} from 'react';
import {useAppStore} from 'stores';

export default function useFCMMessage() {
  const [message, setMessage] = useState<FcmMessage>();

  const fcmMessage = useAppStore(state => state.fcmMessage);

  const isMount = useRef(true);

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
    } else {
      setMessage(fcmMessage);
    }
  }, [fcmMessage?.messageId]);

  return message;
}
