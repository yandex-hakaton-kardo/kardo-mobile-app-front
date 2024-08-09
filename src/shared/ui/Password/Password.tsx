import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { type BaseInputProps } from '../BaseInput';
import { EyeClosedIcon, EyeOpenedIcon } from '../icons';
import { TextInput } from '../TextInput';
import styles from './Password.module.scss';

export type PasswordProps = Omit<BaseInputProps, 'type' | 'afterContent'>;

export const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = showPassword ? EyeOpenedIcon : EyeClosedIcon;
  const { error } = props;

  return (
    <TextInput
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      afterContent={
        <EyeIcon
          className={clsx(styles.eyeIcon, error && styles.error)}
          onClick={() => setShowPassword(!showPassword)}
        />
      }
    />
  );
});
