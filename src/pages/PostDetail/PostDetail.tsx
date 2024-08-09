import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@shared/api';
import { ArrowLeftIcon, Preloader } from '@shared/ui';
import { plural } from '@shared/utils';
import { Video } from '@widgets';
import { useLang } from 'context';
import { CommentsList, FavoriteButton, LikeButton, ShareButton, CommentButton } from './components';
import styles from './PostDetail.module.scss';

export const PostDetail = () => {
  const lang = useLang().post;
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: post } = useGetPostByIdQuery({ postId: Number(postId) }, { skip: !postId });
  const [views, setViews] = useState(post?.views ?? 0);

  useEffect(() => {
    if (post && !views) {
      setViews(post.views);
    }
  }, [post, views]);

  if (!post) {
    return (
      <div className={styles.loaderWrapper}>
        <Preloader />
      </div>
    );
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
          <p>
            {views} {plural(views, lang.view)}
          </p>
          <div className={styles.actions}>
            <LikeButton postId={post.id} likeCount={post.likes} />
            <ShareButton content={window.location.toString()} />
            <CommentButton postId={post.id} />
            <FavoriteButton />
          </div>
        </div>

        <div className={styles.comments}>
          <h2 className={styles.sectionTitle}>{lang.comments}</h2>
          <CommentsList comments={post.comments} />
        </div>
      </div>
    </div>
  );
};
