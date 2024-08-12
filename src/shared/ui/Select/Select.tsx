import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from '../icons';
import styles from './Select.module.scss';

export interface SelectProps {
  label?: string;
  onUpdate: (value: string) => void;
  value?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export const Select = ({ label, onUpdate, value, options, placeholder, disabled }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(open => !open);
    setTimeout(() => optionsRef.current?.scrollIntoView());
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onUpdate(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.container} ref={selectRef}>
      <span className={styles.label}>{label}</span>
      <div className={styles.select}>
        <button type="button" disabled={disabled} className={styles.selectHeader} onClick={toggleDropdown}>
          <span className={styles.input}>
            {value ? options.find(option => option.value === value)?.label : placeholder}
          </span>
          <ArrowDownIcon className={clsx(styles.arrow, isOpen && styles.open)} />
        </button>
        {isOpen && (
          <div className={styles.optionsWrapper} ref={optionsRef}>
            {options.map(option => (
              <div key={option.value} className={styles.option} onClick={() => handleOptionClick(option.value)}>
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
