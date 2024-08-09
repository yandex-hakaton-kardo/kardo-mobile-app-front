import { useState } from 'react';
import { Skeleton } from '@shared/ui';
import styles from './Video.module.scss';

export const Video = ({ src, ...props }: JSX.IntrinsicElements['video']) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.container}>
      {!loaded && <Skeleton className={styles.skeleton} />}
      <video src={src} width="100%" onLoadedData={() => setLoaded(true)} {...props} />
    </div>
  );
};
