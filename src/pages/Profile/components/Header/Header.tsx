import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '@shared/api';
import { ToolsIcon, ExitIcon, WhistleIcon, Button, Modal } from '@shared/ui';
import styles from './Header.module.scss';

export const Header = () => {
  const [logout] = authApi.useLogoutMutation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className={styles.header}>
      <div onClick={() => setModalVisible(true)} className={styles.hammer}>
        <Button size="s" disabled className={styles.hammerIcon}>
          <WhistleIcon height={25} width={26} /> Судейство
        </Button>
      </div>

      <Link to="/settings">
        <ToolsIcon className={styles.icon} />
      </Link>
      <Link to="/auth">
        <ExitIcon className={styles.icon} onClick={() => logout()} />
      </Link>

      <Modal show={modalVisible} onClose={() => setModalVisible(false)}>
        <div className={styles.container}>
          <p className={styles.text}>
            Функция судейства доступна только экспертам для оценки работ участников конкурса
          </p>
          <Button view="action" size="l" onClick={() => setModalVisible(false)}>
            Окей
          </Button>
        </div>
      </Modal>
    </div>
  );
};
