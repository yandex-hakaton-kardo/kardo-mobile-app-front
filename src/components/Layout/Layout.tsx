import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import styles from './Layout.module.scss';

interface LayoutProps {
  hideNav?: boolean;
}

export const Layout = ({ hideNav }: LayoutProps) => (
  <div className={styles.container}>
    <Outlet />

    {!hideNav && (
      <div className={styles.navigation}>
        <Navigation />
      </div>
    )}
  </div>
);
