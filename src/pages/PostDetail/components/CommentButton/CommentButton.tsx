import { useCallback, useEffect, useState } from 'react';
import { useAddCommentToPostMutation } from '@shared/api';
import { Button, CommentIcon, TextInput } from '@shared/ui';
import { Modal } from '@shared/ui/Modal/Modal';
import { useLang } from 'context';
import styles from './CommentButton.module.scss';

interface CommentButtonProps {
  postId: number;
}

export const CommentButton = ({ postId }: CommentButtonProps) => {
  const lang = useLang().post;
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [postComment, { isSuccess, isLoading }] = useAddCommentToPostMutation();

  const onClose = useCallback(() => {
    if (isLoading) return;
    setComment('');
    setModalVisible(false);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const onSendComment = () => {
    postComment({
      postId,
      commentRequest: { text: comment },
    });
  };

  return (
    <>
      <Button className={styles.button} view="normal" size="s" onClick={() => setModalVisible(true)}>
        <CommentIcon width={24} height={24} />
      </Button>
      <Modal show={modalVisible} onClose={onClose}>
        <div className={styles.container}>
          <div className={styles.inputWrapper}>
            <TextInput value={comment} onUpdate={setComment} placeholder={lang.yourComment} disabled={isLoading} />
          </div>
          <div className={styles.actions}>
            <Button view="normal" size="l" wide onClick={onClose}>
              {lang.cancel}
            </Button>
            <Button view="action" size="l" wide onClick={onSendComment} disabled={!comment || isLoading}>
              {lang.send}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
