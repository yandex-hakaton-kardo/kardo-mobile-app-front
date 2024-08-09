import { useState } from 'react';
import { useAddLikeToPostMutation } from '@shared/api';
import { Button, LikeFillIcon, LikeIcon } from '@shared/ui';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  postId: number;
  likeCount: number;
}

export const LikeButton = ({ postId, likeCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);

  const [toggleLike, { isLoading }] = useAddLikeToPostMutation();

  const onClick = () => {
    setLiked(hasLike => !hasLike);
    toggleLike({ postId });
  };

  return (
    <Button disabled={isLoading} className={styles.button} view="normal" size="s" onClick={onClick}>
      {liked ? <LikeFillIcon className={styles.likeIcon} /> : <LikeIcon className={styles.likeIcon} />}
      <span>{likeCount + Number(liked)}</span>
    </Button>
  );
};
