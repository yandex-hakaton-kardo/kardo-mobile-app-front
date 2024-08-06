import styles from './Preloader.module.scss';

export const Preloader = () => (
  <svg className={styles.spinner} width="48px" height="48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <circle className={styles.path} fill="none" strokeWidth="3" strokeLinecap="round" cx="24" cy="24" r="21" />
  </svg>
);
