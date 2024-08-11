import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@shared/api';
import { Skeleton } from '@shared/ui';
import { useInfiniteScroll } from '@shared/utils';
import { Video } from '@widgets';
import { useLang } from 'context';
import styles from './Recommendations.module.scss';

export const Recommendations = () => {
  const lang = useLang().main;
  const ref = useRef<HTMLDivElement>(null);

  const { data: recommendations } = useInfiniteScroll({
    scrollableContainerRef: ref,
    fetchFn: page => api.useGetRecommendationsQuery({ page, size: 6 }),
    type: 'row',
  });

  if (recommendations && recommendations.length === 0) {
    return <div className={styles.placeholder}>{lang.noRecommendations}</div>;
  }

  if (!recommendations) {
    return (
      <div className={styles.skeletons}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className={styles.recommendations} ref={ref}>
      {recommendations.map(post => (
        <Link key={post.id} to={`/feed/${post.id}`} className={styles.recommendation}>
          <Video src={post.file.filePath} />
          <div className={styles.caption}>
            <span className={styles.title}>{post.title}</span>
            <span className={styles.author}>{`${post.author.username}`}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
