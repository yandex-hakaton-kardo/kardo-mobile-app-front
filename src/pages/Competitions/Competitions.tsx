import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { SegmentPicker } from '@shared/ui';
import { cards } from './constants';
import styles from './Competitions.module.scss';

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
        <Link to={`/competitions/${card.id}`} key={card.id} className={clsx(styles.card, styles[card.id])}>
          <div className={styles.cardContent}>
            <p className={styles.cardTitle}>{card.title}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
