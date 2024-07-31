import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'components/icons';
import styles from './NavButton.module.scss';

export interface NavButtonProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
  to: string;
}

export const NavButton = ({ Icon, text, to }: NavButtonProps) => (
  <Link to={to} className={styles.container}>
    <Icon className={clsx(styles.icon, styles.decorationIcon)} />
    <span>{text}</span>
    <ArrowRightIcon className={styles.icon} />
  </Link>
);
