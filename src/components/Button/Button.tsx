import clsx from 'clsx';
import styles from './Button.module.scss';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  view?: 'normal' | 'contrast' | 'action' | 'flat' | 'raised';
  size?: 'large' | 'medium' | 'small';
  wide?: boolean;
};

export const Button = ({ view = 'normal', size = 'large', wide, ...props }: ButtonProps) => {
  const { disabled, className } = props;

  const cls = clsx(
    styles.button,
    disabled && styles.disabled,
    wide && styles.wide,
    styles[view],
    styles[size],
    className,
  );

  return <button {...props} className={cls} type="button" />;
};
