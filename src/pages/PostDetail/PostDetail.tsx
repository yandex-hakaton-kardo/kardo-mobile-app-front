import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Button, CommentIcon, HeartIcon, Skeleton } from '@components';
import { type PostDto, injectedRtkApi } from '@shared/api';
import { Video } from '@widgets/Video';
import { useAppDispatch } from 'app/store';
import { CommentsList, LikeButton, ShareButton } from './components';
import styles from './PostDetail.module.scss';

export const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDto | null>(null);

  useEffect(() => {
    if (postId) {
      dispatch(injectedRtkApi.endpoints.getPostById.initiate({ postId: Number(postId) })).then(result => {
        const { data } = result;
        if (data) {
          setPost(data);
        }
      });
    }
  }, [dispatch, postId]);

  if (!post) {
    return <Skeleton className={styles.skeleton} />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <ArrowLeftIcon width={48} height={48} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <Video src={post.file.filePath} controls />
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.author}>{post.author.username}</p>
        </div>

        <div className={styles.info}>
          <p>{post.views} просмотров</p>
          <div className={styles.actions}>
            <LikeButton postId={post.id} likeCount={post.likes} />
            <ShareButton content={window.location.toString()} />
            <Button className={styles.button} view="normal" size="s">
              <CommentIcon width={24} height={24} />
            </Button>
            <Button className={styles.button} view="normal" size="s" disabled>
              <HeartIcon width={24} height={24} />
            </Button>
          </div>
        </div>

        <div className={styles.comments}>
          <h2 className={styles.sectionTitle}>Комментарии</h2>
          <CommentsList post={post} />
        </div>
      </div>
    </div>
  );
};
