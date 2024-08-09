import { Link } from 'react-router-dom';
import { ToolsIcon } from '@shared/ui';
import { CreatePost } from './components';
import styles from './Admin.module.scss';

export const Admin = () => (
  <div className={styles.page}>
    <header className={styles.pageHeader}>
      <span>Админ панель</span>
      <Link to="/settings">
        <ToolsIcon className={styles.settingsIcon} />
      </Link>
    </header>

    <div className={styles.section}>
      <div className={styles.sectionHeader}>Публикация поста</div>
      <CreatePost />
    </div>
  </div>
);
