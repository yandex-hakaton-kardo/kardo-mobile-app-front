import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllPostByUserQuery } from '@shared/api';
import { Button, SegmentPicker } from '@shared/ui';
import { Feed } from '@widgets';
import { useLang } from 'context';
import { useUserInfo } from 'entities/Auth';
import { Header, UserInfo } from './components';
import styles from './Profile.module.scss';

export const Profile = () => {
  const lang = useLang().profile;
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUserInfo();
  const { data: posts } = useGetAllPostByUserQuery({ userId: user?.id ?? 0 }, { skip: !user?.id });
  const [activeTab, setActiveTab] = useState<'feed' | 'requests'>('feed');

  return (
    <div className={styles.page}>
      <Header />

      <UserInfo />

      <Link to="/admin">
        <Button className={styles.addPost} view="action" wide size="l">
          {lang.addPost}
        </Button>
      </Link>

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
