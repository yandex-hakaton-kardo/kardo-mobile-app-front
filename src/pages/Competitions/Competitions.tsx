import styles from './Competitions.module.scss';
import clsx from 'clsx';

export const Competitions = () => {
  const specImg = clsx(styles.poster, styles.spec);
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.header}>Конкурсы</h1>
        <nav>
          <ul>
            <div className={styles.tabs}>
              <button className={styles.tab}>Участникам</button>
              <button className={styles.tab} disabled>
                Спонсорам
              </button>
            </div>
          </ul>
        </nav>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.title}>Премия</p>
            <img className={styles.poster} src="/images/award.png" alt="award" />
          </div>
          <div className={styles.card}>
            <p className={styles.title}>Видеоконкурс</p>
            <img className={specImg} src="/images/videoCompetition.png" alt="videoCompetition" />
          </div>
          <div className={styles.card}>
            <p className={styles.title}>Проекты</p>
            <img className={styles.poster} src="/images/projects.png" alt="projects" />
          </div>
          <div className={styles.card}>
            <p className={styles.title}>Дети</p>
            <img className={styles.poster} src="/images/children.png" alt="children" />
          </div>
        </div>
      </div>
    </div>
  );
};
