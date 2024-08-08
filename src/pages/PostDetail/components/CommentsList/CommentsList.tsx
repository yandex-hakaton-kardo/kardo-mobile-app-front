import { type PostDto } from '@shared/api';
import styles from './CommentsList.module.scss';

interface CommentsListProps {
  post: PostDto;
}

export const CommentsList = ({ post }: CommentsListProps) => (
  <div className={styles.container}>
    {post.comments.map(comment => (
      <div className={styles.comment} key={comment.id}>
        {/* <Avatar userId={comment.authorId}/> */}
        <span>{comment.authorId}</span>
        <span>{comment.text}</span>
      </div>
    ))}

    {post.comments.length === 0 && <div>Комментариев нет</div>}
  </div>
);
