import clsx from 'clsx';
import { type ChangeEvent, forwardRef, useState } from 'react';
import { BaseInput, type BaseInputProps } from 'components/BaseInput';
import { CheckmarkIcon, QuestionIcon } from 'components/icons';
import styles from './TextInput.module.scss';

export type TextInputProps = BaseInputProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const [hintVisible, setHintVisible] = useState(false);
  const { value, error, hint, disabled, afterContent } = props;

  const showHintText = !error && hint && hintVisible;
  const showHintIcon = !error && hint && !value && !disabled;
  const showCheckIcon = !error && value;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHintVisible(false);
    props.onChange?.(e);
  };

  return (
    <BaseInput
      {...props}
      ref={ref}
      hint={showHintText ? hint : undefined}
      error={error ?? undefined}
      onChange={onChange}
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
