import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { CalendarIcon, EventsIcon, MainIcon, ProfileIcon, ScrollIcon } from '@shared/ui/icons';
import styles from './Navigation.module.scss';

const links: { to: string; Icon: React.ReactNode }[] = [
  {
    to: '/',
    Icon: <MainIcon width={40} height={40} />,
  },
  {
    to: '/feed',
    Icon: <ScrollIcon width={40} height={40} />,
  },
  {
    to: '/competitions',
    Icon: <EventsIcon width={40} height={40} />,
  },
  {
    to: '/events',
    Icon: <CalendarIcon width={40} height={40} />,
  },
  {
    to: '/profile',
    Icon: <ProfileIcon width={40} height={40} />,
  },
];

export const Navigation = () => (
  <nav className={styles.container}>
    {links.map(({ to, Icon }) => (
      <NavLink to={to} key={to} className={({ isActive }) => clsx(styles.link, isActive && styles.active)}>
        {Icon}
      </NavLink>
    ))}
  </nav>
);
