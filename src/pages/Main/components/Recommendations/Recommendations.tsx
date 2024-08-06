import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@shared/api';
import { useInfiniteScroll } from '@utils';
import { Video } from '@widgets/Video';
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

  return (
    <div className={styles.recommendations} ref={ref}>
      {recommendations?.map(post => (
        <Link key={post.id} to={`/video/${post.id}}`} className={styles.recommendation}>
          <Video src={post.file?.filePath?.replace('/home/workshop/kardo/files/', '')} />
          <div className={styles.caption}>
            <span className={styles.title}>{post.title}</span>
            <span className={styles.author}>{`${post.author?.username}`}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
