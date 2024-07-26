import Ticket from './Banner.svg?react';
import type { PropsWithChildren } from 'react';
import styles from './TicketBanner.module.scss';

export const TicketBanner = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>
    <Ticket className={styles.ticket} width="100%" height="100%" />
    <div className={styles.content}>{children}</div>
  </div>
);
