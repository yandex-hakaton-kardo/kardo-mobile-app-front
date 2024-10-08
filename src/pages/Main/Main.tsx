import clsx from 'clsx';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@shared/api';
import { TicketBanner, ToolsIcon } from '@shared/ui';
import { format, useInfiniteScroll } from '@shared/utils';
import { Feed } from '@widgets';
import { useLang } from 'context';
import { useUserInfo } from 'entities/Auth';
import { Recommendations } from './components';
import styles from './Main.module.scss';

export const Main = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const lang = useLang().main;
  const { user } = useUserInfo();

  const { data: posts } = useInfiniteScroll({
    scrollableContainerRef: pageRef,
    fetchFn: page => api.useGetFeedQuery({ page, size: 8 }),
  });

  return (
    <div className={styles.page} ref={pageRef}>
      <header className={styles.pageHeader}>
        {user?.username && <span className={styles.username}>{format(lang.greeting, user.username)}</span>}
        <Link to="/settings">
          <ToolsIcon className={styles.settingsIcon} />
        </Link>
      </header>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>{lang.recommendations}</div>
        <Recommendations />
      </div>

      <a href="https://kardoaward.com/" target="__blank">
        <TicketBanner width="100%" height="100%" />
      </a>

      <div className={clsx(styles.section, styles.feed)}>
        <div className={styles.sectionHeader}>{lang.feed}</div>
        <div className={styles.feedWrapper}>
          <Feed posts={posts} />
        </div>
      </div>
    </div>
  );
};
