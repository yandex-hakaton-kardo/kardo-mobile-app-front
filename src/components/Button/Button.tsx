import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  onClick: () => void;
  view?: 'normal' | 'contrast' | 'action' | 'flat' | 'raised';
  size?: 'large' | 'medium' | 'small';
  wide?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button = ({
  view = 'normal',
  size = 'large',
  disabled,
  wide,
  className,
  onClick,
  children,
}: ButtonProps) => {
  const cls = clsx(
    styles.button,
    disabled && styles.disabled,
    wide && styles.wide,
    styles[view],
    styles[size],
    className,
  );

  return (
    <button className={cls} type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
