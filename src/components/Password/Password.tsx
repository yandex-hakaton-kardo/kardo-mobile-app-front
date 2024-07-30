import clsx from 'clsx';
import { useState } from 'react';
import { type BaseInputProps } from 'components/BaseInput';
import { EyeClosedIcon, EyeOpenedIcon } from 'components/icons';
import { TextInput } from '../TextInput';
import styles from './Password.module.scss';

export type PasswordProps = Omit<BaseInputProps, 'type' | 'afterContent'>;

export const Password = (props: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = showPassword ? EyeOpenedIcon : EyeClosedIcon;
  const { error } = props;

  return (
    <TextInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      afterContent={
        <EyeIcon
          className={clsx(styles.eyeIcon, error && styles.error)}
          onClick={() => setShowPassword(!showPassword)}
        />
      }
    />
  );
};
