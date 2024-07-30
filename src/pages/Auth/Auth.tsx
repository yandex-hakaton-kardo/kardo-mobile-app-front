import { Link } from 'react-router-dom';
import { PlusIcon } from '@components';
import { useLang } from 'context';
import styles from './Auth.module.scss';

export const Auth = () => {
  const lang = useLang().auth;

  return (
    <div className={styles.pageBg}>
      <div className={styles.page}>
        <div className={styles.header}>
          <p className={styles.header1}>{lang.title}</p>
          <p className={styles.header2}>{lang.appName}</p>
        </div>

        <div className={styles.content}>
          <p>{lang.chooseAccount}</p>
          <Link to="/auth/signup" className={styles.accountButton}>
            <PlusIcon width={48} height={48} />
            {lang.createAccount}
          </Link>
        </div>

        <footer className={styles.footer}>
          {`${lang.continueYouAgree} `}
          <a className={styles.link} href="!#">
            {lang.termsOfUse}
          </a>
          {` | `}
          <a className={styles.link} href="!#">
            {lang.privatePolicy}
          </a>
        </footer>
      </div>
    </div>
  );
};
