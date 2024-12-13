import {useAppStore} from 'stores';

export function useIsSignedIn() {
  const isSignedIn = useAppStore(state => state.accessToken);
  return isSignedIn ? true : false;
}

export function useIsSignedOut() {
  const userToken = useAppStore(state => state.accessToken);
  return userToken ? false : true;
}
