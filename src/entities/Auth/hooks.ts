import { useFindUserByUsernameQuery } from '@shared/api';
import { useAppSelector } from 'app/store';

export const useUserInfo = () => {
  const userName = useAppSelector(state => state.auth.userName);
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useFindUserByUsernameQuery({ username: userName ?? '' }, { skip: !userName });
  return {
    user,
    isLoading,
    isError,
    error,
  };
};
