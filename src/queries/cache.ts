import {queryClient} from 'queries';
import {userInfoOption} from './user';

export const getUserInfo = () => {
  return queryClient.getQueryData(userInfoOption().queryKey);
};
