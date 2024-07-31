import clsx from 'clsx';
import { debounce } from 'es-toolkit';
import { useCallback, useState } from 'react';
import { CrossIcon, MicrophoneIcon, SearchIcon } from 'components/icons';
import styles from './SearchInput.module.scss';

export interface SearchInputProps {
  onUpdate: (search: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput = ({ onUpdate, placeholder, disabled }: SearchInputProps) => {
  const [value, setValue] = useState('');

  const onUpdateDebounced = useCallback(debounce(onUpdate, 500), [onUpdate]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onUpdateDebounced(newValue);
  };

  const onReset = () => {
    setValue('');
    onUpdate('');
  };

  const iconCls = clsx(styles.icon, disabled && styles.disabledIcon);

  return (
    <search className={clsx(styles.container, styles.disabled)}>
      <SearchIcon className={iconCls} />

      <input className={styles.input} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />

      {value ? <CrossIcon onClick={onReset} className={iconCls} /> : <MicrophoneIcon className={iconCls} />}
    </search>
  );
};
