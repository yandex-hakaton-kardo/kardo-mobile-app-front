import clsx from 'clsx';
import { useGetUserProfilePictureQuery } from '@shared/api';
import styles from './Avatar.module.scss';

export type AvatarProps = Omit<JSX.IntrinsicElements['img'], 'src'> & {
  userId?: number;
};

export const Avatar = ({ userId, className, ...props }: AvatarProps) => {
  const { data: userPicture } = useGetUserProfilePictureQuery({ userId: userId ?? 0 }, { skip: !userId });

  return (
    <img
      src={userPicture?.filePath ?? '/icons/user.default.png'}
      alt="avatar"
      className={clsx(styles.image, className)}
      {...props}
    />
  );
};
