import clsx from 'clsx';
import { type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@shared/api';
import { useInfiniteScroll } from '@utils';
import { useLang } from 'context';
import { Video } from '../Video';
import styles from './Feed.module.scss';

interface FeedProps {
  scrollableContainerRef: RefObject<HTMLElement>;
  searchFilter?: string;
  className?: string;
}

export const Feed = ({ scrollableContainerRef, className, searchFilter = '' }: FeedProps) => {
  const lang = useLang().main;

  const { data: posts } = useInfiniteScroll({
    scrollableContainerRef,
    fetchFn: page => api.useGetFeedQuery({ page, size: 8, searchFilter }),
  });

  if (posts && posts.length === 0) {
    return <div className={styles.placeholder}>{lang.emptyFeed}</div>;
  }

  return (
    <div className={clsx(styles.feed, className)}>
      {posts?.map(post => (
        <Link key={post.id} to={`/video/${post.id}}`} className={styles.feedItem}>
          <Video src={post.file?.filePath?.replace('/home/workshop/kardo/files/', '')} />
          <div className={styles.info}>
            <p className={styles.title}>{post.title}</p>
            <p className={styles.author}>{post.author?.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
