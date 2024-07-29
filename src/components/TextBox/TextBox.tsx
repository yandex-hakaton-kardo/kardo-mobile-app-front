import clsx from 'clsx';
import { type ChangeEvent, useId, forwardRef, useState } from 'react';
import { CheckmarkIcon, QuestionIcon } from 'components/icons';
import styles from './TextBox.module.scss';

type TextBoxProps = JSX.IntrinsicElements['input'] & {
  /** Описание над полем */
  label?: string;
  /** Подсказка под полем */
  hint?: string;
  /** Отображаемая ошибка */
  error?: string;
  /** Текущее значение */
  value: string;
  /** Обработчик изменения значения */
  onUpdate?: (value: string) => void;
};

export const TextBox = forwardRef<HTMLInputElement, TextBoxProps>(
  ({ value, label, error, hint, disabled, ...props }, ref) => {
    const internalId = useId();
    const id = props.id ?? internalId;

    const [hintVisible, setHintVisible] = useState(false);

    const showHintIcon = hint && !value && !error && !disabled;
    const showCheckIcon = value && !error;

    const onUpdate = (e: ChangeEvent<HTMLInputElement>) => {
      props.onUpdate?.(e.target.value);
      props.onChange?.(e);
      setHintVisible(false);
    };

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={id} className={clsx(styles.label, disabled && styles.disabled)}>
            {label}
          </label>
        )}

        <div className={clsx(styles.inputContainer, disabled && styles.disabled)}>
          <input
            {...props}
            id={id}
            disabled={disabled}
            className={clsx(styles.input, error && styles.error, props.className)}
            value={value}
            onChange={onUpdate}
            ref={ref}
          />

          {showHintIcon && (
            <QuestionIcon
              className={clsx(styles.hintIcon, hintVisible && styles.active)}
              onClick={() => setHintVisible(!hintVisible)}
            />
          )}

          {showCheckIcon && <CheckmarkIcon className={styles.checkIcon} />}
        </div>

        {error && <span className={clsx(styles.hint, styles.error)}>{error}</span>}
        {hintVisible && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  },
);
