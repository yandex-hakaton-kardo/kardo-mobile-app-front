import { useNavigate } from 'react-router-dom';
import { Button, PlusIcon, VkIcon } from '@components';
import { useLang } from 'context';
import styles from './Auth.module.scss';

export const Auth = () => {
  const lang = useLang().auth;
  const navigate = useNavigate();

  return (
    <div className={styles.pageBg}>
      <div className={styles.page}>
        <div className={styles.header}>
          <p className={styles.header1}>{lang.title}</p>
          <p className={styles.header2}>{lang.appName}</p>
        </div>

        <div className={styles.content}>
          <p>{lang.chooseAccount}</p>
          <Button className={styles.accountButton} onClick={() => navigate('/auth/signup')} wide size="xl">
            <PlusIcon width={48} height={48} />
            <span className={styles.btnText}>{lang.createAccount}</span>
          </Button>
          <Button disabled className={styles.accountButton} wide size="xl">
            <VkIcon width={48} height={48} />
            <span className={styles.btnText}>{lang.vkLogin}</span>
          </Button>
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
