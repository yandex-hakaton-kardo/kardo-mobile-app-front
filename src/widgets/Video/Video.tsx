import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@components';
import { requestWithAuth, requestWithReAuth } from '@shared/api';
import { useAppDispatch } from 'app/store';
import styles from './Video.module.scss';

export const Video = ({ src, ...props }: JSX.IntrinsicElements['video']) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'none' | 'loading' | 'loaded'>('none');

  useEffect(() => {
    if (!src || status !== 'none') return;
    setStatus('loading');
    requestWithReAuth(dispatch, () => requestWithAuth(`/api/content/${src}`))
      .then(res => res.blob())
      .then(blob => {
        if (ref.current) {
          ref.current.src = URL.createObjectURL(blob);
          ref.current.onloadedmetadata = () => setStatus('loaded');
        }
      });
  }, [dispatch, src, status]);

  return (
    <div className={styles.container}>
      <Skeleton className={clsx(styles.skeleton, status === 'loaded' && styles.hidden)} />
      <video ref={ref} src="" width="100%" {...props} />
    </div>
  );
};
