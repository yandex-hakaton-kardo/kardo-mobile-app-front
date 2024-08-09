import { useFindUserByUsernameQuery } from '@shared/api';
import { format } from '@shared/utils';
import { Avatar } from '@widgets';
import { useAppSelector } from 'app/store';
import { useLang } from 'context';
import styles from './UserInfo.module.scss';

export const UserInfo = () => {
  const lang = useLang().profile;

  const userName = useAppSelector(state => state.auth.userName);
  const { data: user } = useFindUserByUsernameQuery({ username: userName ?? '' });

  return (
    <div className={styles.container}>
      <div className={styles.mainUserInfo}>
        <Avatar userId={user?.id} className={styles.avatar} width={80} height={80} />
        <div>
          <div className={styles.name}>{user?.username}</div>
          <div className={styles.email}>{user?.email}</div>
          <div className={styles.date}>{user?.dateOfBirth}</div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.publications}>{format(lang.countPublications, '85')}</div>
        <div className={styles.friends}>{format(lang.countFriends, '100')}</div>
      </div>
    </div>
  );
};
