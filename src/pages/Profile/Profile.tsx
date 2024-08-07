import { useRef, useState } from 'react';
import { Button } from '@components';
import { useFindUserByUsernameQuery, useGetAllPostByUserQuery } from '@shared/api';
import { Feed } from '@widgets/Feed';
import { useAppSelector } from 'app/store';
import { SegmentPicker } from 'components/SegmentPicker';
import { useLang } from 'context';
import { Header, UserInfo } from './components';
import styles from './Profile.module.scss';

export const Profile = () => {
  const lang = useLang().profile;
  const ref = useRef<HTMLDivElement>(null);
  const username = useAppSelector(state => state.auth.userName);
  const { data: user } = useFindUserByUsernameQuery({ username: username ?? '' }, { skip: !username });
  const { data: posts } = useGetAllPostByUserQuery({ userId: user?.id ?? 0 }, { skip: !user?.id });
  const [activeTab, setActiveTab] = useState<'feed' | 'requests'>('feed');

  return (
    <div className={styles.page}>
      <Header />

      <UserInfo />

      <Button className={styles.addFriend} view="action" wide size="l" disabled>
        {lang.addFriends}
      </Button>

      <SegmentPicker
        activeSegment={activeTab}
        segments={[
          { id: 'feed', text: 'Лента', onClick: () => setActiveTab('feed') },
          { id: 'requests', text: 'Заявки', onClick: () => setActiveTab('requests') },
        ]}
      />

      <div className={styles.tabsContentWrapper} ref={ref}>
        {activeTab === 'feed' && <Feed posts={posts} />}
      </div>
    </div>
  );
};
