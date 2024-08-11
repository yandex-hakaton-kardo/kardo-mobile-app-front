import { useAddLikeToPostMutation } from '@shared/api';
import { Button, LikeFillIcon, LikeIcon } from '@shared/ui';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  postId: number;
  liked?: boolean;
  likeCount: number;
}

export const LikeButton = ({ postId, likeCount, liked }: LikeButtonProps) => {
  const [toggleLike, { isLoading }] = useAddLikeToPostMutation();

  return (
    <Button
      disabled={isLoading}
      className={styles.button}
      view="normal"
      size="s"
      onClick={() => toggleLike({ postId })}
    >
      {liked ? <LikeFillIcon className={styles.likeIcon} /> : <LikeIcon className={styles.likeIcon} />}
      <span>{likeCount}</span>
    </Button>
  );
};
