import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { getCountryByName, getRegionByName, getCompetitionTypeByKey } from '@shared/constants';
import type { EventDto } from '@shared/api';
import styles from './EventCard.module.scss';

interface EventCardProps {
  event: EventDto;
}

export const EventCard = ({ event }: EventCardProps) => {
  const startDate = dayjs(event.eventStart).format('DD.MM');
  const endDate = dayjs(event.eventEnd).format('DD.MM');
  const countryId = getCountryByName(event.country!)?.id;
  const regionId = getRegionByName(event.region!)?.id;
  const imageSrc = countryId === 1 ? `/images/regions/${regionId}.jpeg` : `/images/countries/${countryId}.jpeg`;

  return (
    <Link
      to={`/events/${event.id}`}
      key={event.id}
      className={styles.eventCardWrapper}
      style={{ backgroundImage: `url("${imageSrc}")` }}
    >
      <div className={styles.eventCard}>
        <div className={styles.tags}>
          <div className={styles.tag}>{getCompetitionTypeByKey(event.eventType)?.label}</div>
          <div className={styles.tag}>{event.activity}</div>
        </div>
        <div className={styles.eventInfo}>
          <p className={styles.eventTitle}>{event.eventName}</p>
          <p className={styles.eventDate}>{startDate === endDate ? startDate : `${startDate} - ${endDate}`}</p>
        </div>
      </div>
    </Link>
  );
};
