import { useRef } from 'react';
import { api } from '@shared/api';
import { CalendarIcon } from '@shared/ui';
import { useInfiniteScroll } from '@shared/utils';
import { EventCard, EventsPlaceholder, EventsSkeleton } from './components';
import styles from './Events.module.scss';

export const Events = () => {
  const ref = useRef(null);
  const { data: events } = useInfiniteScroll({
    fetchFn: page =>
      api.useGetEventsQuery({
        page,
        size: 10,
        searchFilter: {
          types: ['PREMIUM'],
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
        <div className={styles.filters}>фильтр</div>
        <div className={styles.events} ref={ref}>
          {events === undefined && <EventsSkeleton />}
          {events?.length === 0 && <EventsPlaceholder />}
          {events?.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </div>
  );
};
