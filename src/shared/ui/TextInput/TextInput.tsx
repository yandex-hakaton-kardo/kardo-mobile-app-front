import clsx from 'clsx';
import { type ChangeEvent, type FocusEvent, forwardRef, useState } from 'react';
import { BaseInput, type BaseInputProps } from '../BaseInput';
import { CheckmarkIcon, QuestionIcon } from '../icons';
import styles from './TextInput.module.scss';

export type TextInputProps = BaseInputProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const [hintVisible, setHintVisible] = useState(false);
  const [touched, setTouched] = useState(false);
  const { value, error, hint, disabled, afterContent } = props;

  const showHintText = !error && hint && hintVisible;
  const showHintIcon = !error && hint && !value && !disabled;
  const showCheckIcon = !error && value;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHintVisible(false);
    props.onChange?.(e);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    props.onBlur?.(e);
  };

  return (
    <BaseInput
      {...props}
      ref={ref}
      hint={showHintText ? hint : undefined}
      error={touched ? error : undefined}
      onChange={onChange}
      onBlur={onBlur}
      afterContent={
        <>
          {afterContent}

          {showHintIcon && (
            <QuestionIcon
              className={clsx(styles.hintIcon, hintVisible && styles.active)}
              onClick={() => setHintVisible(!hintVisible)}
            />
          )}

          {showCheckIcon && <CheckmarkIcon className={styles.checkIcon} />}
        </>
      }
    />
  );
});
