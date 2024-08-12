import dayjs from 'dayjs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFindEventByIdQuery } from '@shared/api';
import { getCountryByName, getRegionByName } from '@shared/constants';
import { ArrowLeftIcon, Button, Preloader } from '@shared/ui';
import styles from './EventDetails.module.scss';

export const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: event } = useFindEventByIdQuery({ eventId: Number(id) }, { skip: !id });

  if (!event) {
    return (
      <div className={styles.loaderWrapper}>
        <Preloader />
      </div>
    );
  }

  const countryId = event.country ? getCountryByName(event.country)?.id : undefined;
  const regionId = event.region ? getRegionByName(event.region)?.id : undefined;
  const imageSrc = countryId === 1 ? `/images/regions/${regionId}.jpeg` : `/images/countries/${countryId}.jpeg`;

  const startDate = dayjs(event.eventStart).format('DD MMMM');
  const endDate = dayjs(event.eventEnd).format('DD MMMM');
  const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <ArrowLeftIcon className={styles.headerIcon} onClick={() => navigate(-1)} />
        <p className={styles.headerText}>Событие</p>
      </div>

      <div className={styles.content}>
        <div className={styles.image} style={{ backgroundImage: `url("${imageSrc}")` }}>
          <div className={styles.eventHeader}>
            <p>{event.eventName}</p>
            <p>{date}</p>
          </div>
        </div>

        <div className={styles.description}>
          <p>{event.description}</p>
        </div>
      </div>

      <Link to={`/competitions/${event.id}/request`}>
        <Button view="action" wide size="l">
          Подать заявку
        </Button>
      </Link>
    </div>
  );
};
