import { useState } from 'react';
import { Button, HeartIcon } from '@shared/ui';
import { Modal } from '@shared/ui/Modal/Modal';
import { useLang } from 'context';
import styles from './FavoriteButton.module.scss';

export const FavoriteButton = () => {
  const lang = useLang().common;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div className={styles.buttonWrapper} onClick={() => setModalVisible(true)}>
        <Button className={styles.button} view="normal" size="s" disabled wide>
          <HeartIcon width={24} height={24} />
        </Button>
      </div>
      <Modal show={modalVisible} onClose={() => setModalVisible(false)}>
        <div className={styles.container}>
          <p className={styles.text}>{lang.notAvailable}</p>
          <Button view="action" size="l" onClick={() => setModalVisible(false)}>
            {lang.ok}
          </Button>
        </div>
      </Modal>
    </>
  );
};
