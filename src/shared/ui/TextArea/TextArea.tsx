import clsx from 'clsx';
import { useId } from 'react';
import styles from './TextArea.module.scss';

export type TextAreaProps = JSX.IntrinsicElements['textarea'] & {
  label?: string;
  onUpdate?: (value: string) => void;
};

export const TextArea = ({ label, onUpdate, ...props }: TextAreaProps) => {
  const internalId = useId();
  const id = props.id ?? internalId;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate?.(e.target.value);
    props.onChange?.(e);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <textarea {...props} id={id} className={clsx(styles.textarea, props.className)} onChange={onChange} />
    </div>
  );
};
