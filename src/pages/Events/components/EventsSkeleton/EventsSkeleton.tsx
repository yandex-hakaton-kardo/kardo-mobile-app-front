import { Skeleton } from '@shared/ui';
import styles from './EventsSkeleton.module.scss';

export const EventsSkeleton = () => (
  <div className={styles.list}>
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
  </div>
);
