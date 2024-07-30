import clsx from 'clsx';
import { type ChangeEvent, useId, forwardRef, type ReactNode } from 'react';
import styles from './BaseInput.module.scss';

export type BaseInputProps = JSX.IntrinsicElements['input'] & {
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
  /** Дополнительные элементы(иконки, кнопки) размещаемые справа от поля ввода */
  afterContent?: ReactNode;
};

/** Базовый компонент для поля ввода. Используется только для создания поверх него других полей ввода */
export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ value, label, error, hint, disabled, afterContent, ...props }, ref) => {
    const internalId = useId();
    const id = props.id ?? internalId;

    const onUpdate = (e: ChangeEvent<HTMLInputElement>) => {
      props.onUpdate?.(e.target.value);
      props.onChange?.(e);
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

          {afterContent}
        </div>

        {error && <span className={clsx(styles.hint, styles.error)}>{error}</span>}
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  },
);
