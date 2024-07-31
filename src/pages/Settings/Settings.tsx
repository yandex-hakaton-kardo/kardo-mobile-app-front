import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  HeartIcon,
  LanguageIcon,
  LockIcon,
  NavButton,
  NotificationIcon,
  ProfileIcon,
  SupportIcon,
} from '@components';
import { useLang } from 'context';
import styles from './Settings.module.scss';

export const Settings = () => {
  const lang = useLang().settings;
  const username = 'username';
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <ArrowLeftIcon onClick={() => navigate(-1)} />
        <h1 className={styles.header}>{lang.title}</h1>
      </div>

      <main className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{lang.account}</h2>
          <NavButton Icon={ProfileIcon} text={username} to="/settings/profile" />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{lang.main}</h2>
          <NavButton Icon={NotificationIcon} text={lang.notifications} to="/settings/notify" />
          <NavButton Icon={LockIcon} text={lang.confidence} to="/settings/private" />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{lang.additional}</h2>
          <NavButton Icon={HeartIcon} text={lang.favorite} to="/settings/favorite" />
          <NavButton Icon={SupportIcon} text={lang.support} to="/settings/support" />
          <NavButton Icon={LanguageIcon} text={lang.lang} to="/settings/lang" />
        </div>
      </main>
    </div>
  );
};
