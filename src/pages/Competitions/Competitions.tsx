import clsx from 'clsx';
import { SegmentPicker } from '@shared/ui';
import styles from './Competitions.module.scss';

const cards = [
  { title: 'Премия', imageClass: 'award' },
  { title: 'Видеоконкурс', imageClass: 'video' },
  { title: 'Проекты', imageClass: 'projects' },
  { title: 'Дети', imageClass: 'children' },
];

export const Competitions = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <h1 className={styles.headerText}>Конкурсы</h1>
      <SegmentPicker
        activeSegment="participant"
        segments={[
          { id: 'participant', text: 'Участникам' },
          { id: 'sponsor', text: 'Спонсорам' },
        ]}
      />
    </div>

    <div className={styles.content}>
      {cards.map(card => (
        <div key={card.title} className={clsx(styles.card, styles[card.imageClass])}>
          <div className={styles.cardContent}>
            <p className={styles.cardTitle}>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
