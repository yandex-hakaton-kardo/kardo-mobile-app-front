import clsx from 'clsx';
import { ru } from 'date-fns/locale';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { api, type CompetitionType } from '@shared/api';
import { competitionTypes, competitionDirections } from '@shared/constants';
import { CalendarIcon, Select } from '@shared/ui';
import { useInfiniteScroll } from '@shared/utils';
import { EventCard, EventsPlaceholder, EventsSkeleton } from './components';
import styles from './Events.module.scss';
import 'react-day-picker/style.css';

export const Events = () => {
  const ref = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [type, setType] = useState('all');
  const [direction, setDirection] = useState('all');
  const [date, setDate] = useState<DateRange>();
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (calendarVisible && !calendarRef.current?.contains(e.target as Node)) {
        setCalendarVisible(false);
      }
    };

    document.addEventListener('click', outsideClickHandler);

    return () => document.removeEventListener('click', outsideClickHandler);
  }, [calendarVisible]);

  const { data: events } = useInfiniteScroll({
    fetchFn: page =>
      api.useGetEventsQuery({
        page,
        size: 10,
        searchFilter: {
          types: type === 'all' ? ['PREMIUM', 'PROJECT', 'VIDEO_CONTEST', 'CHILDREN'] : [type as CompetitionType],
          activity: direction === 'all' ? undefined : direction,
          startDate: dayjs(date?.from).format('YYYY-MM-DD'),
          endDate: dayjs(date?.to).format('YYYY-MM-DD'),
          sort: 'EVENT_START',
        },
      }),
    scrollableContainerRef: ref,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        Афиша
        <CalendarIcon className={styles.calendarIcon} onClick={() => setTimeout(() => setCalendarVisible(true))} />
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
          <div ref={calendarRef} className={clsx(styles.calendarWrapper, !calendarVisible && styles.hidden)}>
            <DayPicker locale={ru} mode="range" selected={date} onSelect={setDate} required />
          </div>
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
