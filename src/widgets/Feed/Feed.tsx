import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Skeleton } from '@components';
import { type PostDto } from '@shared/api';
import { useLang } from 'context';
import { Video } from '../Video';
import styles from './Feed.module.scss';

interface FeedProps {
  posts?: PostDto[];
  className?: string;
}

export const Feed = ({ posts, className }: FeedProps) => {
  const lang = useLang().main;

  if (posts && posts.length === 0) {
    return <div className={styles.placeholder}>{lang.emptyFeed}</div>;
  }

  if (!posts) {
    return (
      <div className={styles.feed}>
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div className={clsx(styles.feed, className)}>
      {posts.map(post => (
        <Link key={post.id} to={`/feed/${post.id}`} className={styles.feedItem}>
          <Video src={post.file.filePath} />
          <div className={styles.info}>
            <p className={styles.title}>{post.title}</p>
            <p className={styles.author}>{post.author.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
