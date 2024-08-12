import { useRef, useState } from 'react';
import { api, type CompetitionType } from '@shared/api';
import { competitionTypes, competitionDirections } from '@shared/constants';
import { CalendarIcon, Select } from '@shared/ui';
import { useInfiniteScroll } from '@shared/utils';
import { EventCard, EventsPlaceholder, EventsSkeleton } from './components';
import styles from './Events.module.scss';

export const Events = () => {
  const ref = useRef(null);
  const [type, setType] = useState('all');
  const [direction, setDirection] = useState('all');

  const { data: events } = useInfiniteScroll({
    fetchFn: page =>
      api.useGetEventsQuery({
        page,
        size: 10,
        searchFilter: {
          types: type === 'all' ? ['PREMIUM', 'PROJECT', 'VIDEO_CONTEST', 'CHILDREN'] : [type as CompetitionType],
          activity: direction === 'all' ? undefined : direction,
          startDate: '2024-08-10',
          endDate: '2024-08-13',
          sort: 'EVENT_START',
        },
      }),
    scrollableContainerRef: ref,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        Афиша
        <CalendarIcon className={styles.calendar} />
      </div>

      <div className={styles.content}>
        <div className={styles.filters}>
          <Select
            value={type}
            onUpdate={setType}
            options={[{ value: 'all', label: 'Все типы' }].concat(competitionTypes)}
          />
          <Select
            value={direction}
            onUpdate={setDirection}
            options={[{ value: 'all', label: 'Все направления' }].concat(competitionDirections)}
          />
        </div>
        <div className={styles.events} ref={ref}>
          {events === undefined && <EventsSkeleton />}
          {events?.length === 0 && <EventsPlaceholder />}
          {events?.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </div>
  );
};
