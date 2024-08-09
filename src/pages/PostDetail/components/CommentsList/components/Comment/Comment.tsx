import { useFindUserByIdQuery, type CommentDto } from '@shared/api';
import { Avatar } from '@widgets';
import styles from './Comment.module.scss';

interface CommentProps {
  comment: CommentDto;
}

export const Comment = ({ comment }: CommentProps) => {
  const { data: user } = useFindUserByIdQuery({ userId: comment.authorId });
  return (
    <div className={styles.comment} key={comment.id}>
      <Avatar userId={comment.authorId} width={32} height={32} />
      <div>
        <p>{user?.username}</p>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};
