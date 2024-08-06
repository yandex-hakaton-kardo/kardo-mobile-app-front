import clsx from 'clsx';
import { CrossIcon, MicrophoneIcon, SearchIcon } from 'components/icons';
import styles from './SearchInput.module.scss';

export interface SearchInputProps {
  value: string;
  onUpdate: (search: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput = ({ value, onUpdate, placeholder, disabled }: SearchInputProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onUpdate(newValue);
  };

  const onReset = () => {
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
