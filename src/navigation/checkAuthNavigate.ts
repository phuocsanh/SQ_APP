import {useAppStore} from 'stores';
import {navigationRef} from './navigationRef';

export default function checkAuthNavigate() {
  const userToken = useAppStore.getState().userToken;
  if (!userToken) {
    navigationRef.navigate('Login');
    return false;
  }
  return true;
}
