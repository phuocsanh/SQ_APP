import {useAppStore} from 'stores';

export function useIsSignedIn() {
  const isSignedIn = useAppStore(state => state.userToken);
  return isSignedIn ? true : false;
}

export function useIsSignedOut() {
  const userToken = useAppStore(state => state.userToken);
  return userToken ? false : true;
}
