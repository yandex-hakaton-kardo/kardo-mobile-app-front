import { Link } from 'react-router-dom';
import { authApi } from '@shared/api';
import { HammerIcon, ToolsIcon, ExitIcon } from '@shared/ui';
import styles from './Header.module.scss';

export const Header = () => {
  const [logout] = authApi.useLogoutMutation();

  return (
    <div className={styles.header}>
      <Link to="/admin" className={styles.hammerIcon}>
        <HammerIcon className={styles.icon} />
      </Link>
      <Link to="/settings">
        <ToolsIcon className={styles.icon} />
      </Link>
      <Link to="/auth">
        <ExitIcon className={styles.icon} onClick={() => logout()} />
      </Link>
    </div>
  );
};
