import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ToolsIcon } from '@shared/ui';
import { CreatePost } from './components';
import styles from './Admin.module.scss';

export const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <ArrowLeftIcon onClick={() => navigate(-1)} />
        <span>Публикация поста</span>
        <Link to="/settings">
          <ToolsIcon className={styles.settingsIcon} />
        </Link>
      </header>

      <div className={styles.section}>
        <CreatePost />
      </div>
    </div>
  );
};
