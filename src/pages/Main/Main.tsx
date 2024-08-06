import { Link } from 'react-router-dom';
import { ToolsIcon } from '@components';
import { useFindUserByUsernameQuery } from '@shared/api';
import { format } from '@utils';
import { useAppSelector } from 'app/store';
import { useLang } from 'context';
import { mockPosts } from './constants';
import styles from './Main.module.scss';

export const Main = () => {
  const lang = useLang().main;
  const userName = useAppSelector(state => state.auth.userName);
  const { data: user } = useFindUserByUsernameQuery({ username: userName ?? '' });

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        {user?.username && <span>{format(lang.greeting, user.username)}</span>}
        <Link to="/settings">
          <ToolsIcon className={styles.settingsIcon} />
        </Link>
      </header>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>{lang.recommendations}</div>
        <div className={styles.recommendations}>
          {mockPosts.map(post => (
            <Link key={post.id} to={`/video/${post.id}}`} className={styles.recommendation}>
              <video src={post.file.filePath} width={200} height={140} preload="none" />
              <div className={styles.caption}>
                <span className={styles.title}>{post.title}</span>
                <span className={styles.author}>{`${post.author.name} ${post.author.surname}`}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>{lang.feed}</div>
        <div className={styles.feed}>
          {mockPosts.map(post => (
            <Link key={post.id} to={`/video/${post.id}}`} className={styles.feedItem}>
              <video src={post.file.filePath} width="100%" height="100%" preload="none" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
