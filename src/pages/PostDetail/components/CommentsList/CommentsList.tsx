import { type CommentDto } from '@shared/api';
import { useLang } from 'context';
import { Comment } from './components';
import styles from './CommentsList.module.scss';

interface CommentsListProps {
  comments: CommentDto[];
}

export const CommentsList = ({ comments }: CommentsListProps) => {
  const lang = useLang().post;

  return (
    <div className={styles.container}>
      {comments.length === 0 && <div>{lang.noComments}</div>}
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
