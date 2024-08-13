import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { useFindEventByIdQuery } from '@shared/api';
import { getCountryByName, getRegionByName } from '@shared/constants';
import { Button, Preloader } from '@shared/ui';
import { useUserInfo } from 'entities/Auth';
import styles from './Success.module.scss';

export const Success = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserInfo();
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
      <div className={styles.content}>
        <div className={styles.image} style={{ backgroundImage: `url("${imageSrc}")` }}>
          <div className={styles.eventHeader}>
            <p>{event.eventName}</p>
            <p>{date}</p>
          </div>
        </div>

        <p className={styles.header1}>Поздравляем!</p>
        <p className={styles.header2}>Регистрация прошла успешно</p>

        <p className={styles.description}>
          За сутки до мероприятия мы пришлём вам персональную ссылку на трансляцию на адрес вашей электронной почты
          {` ${user?.email}`}
        </p>
      </div>

      <div className={styles.actions}>
        <Button view="action" wide size="l" disabled>
          Добавить в календарь
        </Button>
        <Link to="/profile">
          <Button view="action" wide size="l">
            Перейти в профиль
          </Button>
        </Link>
      </div>
    </div>
  );
};
