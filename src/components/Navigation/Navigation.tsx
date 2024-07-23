import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { CalendarIcon, EventsIcon, MainIcon, ProfileIcon, SearchIcon } from '@components';
import styles from './Navigation.module.scss';

const links: { to: string; Icon: React.ReactNode }[] = [
  {
    to: '/',
    Icon: <MainIcon />,
  },
  {
    to: '/feed',
    Icon: <SearchIcon />,
  },
  {
    to: '/competitions',
    Icon: <EventsIcon />,
  },
  {
    to: '/events',
    Icon: <CalendarIcon />,
  },
  {
    to: '/profile',
    Icon: <ProfileIcon />,
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
