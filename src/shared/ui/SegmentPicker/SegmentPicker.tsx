import clsx from 'clsx';
import { type ReactNode } from 'react';
import styles from './SegmentPicker.module.scss';

interface SegmentPickerProps {
  segments: {
    id: string;
    text: ReactNode;
    onClick?: () => void;
  }[];
  activeSegment: string;
}

export const SegmentPicker = ({ segments, activeSegment }: SegmentPickerProps) => (
  <div className={styles.container}>
    {segments.map(({ id, text, onClick }) => (
      <button
        key={id}
        type="button"
        onClick={onClick}
        className={clsx(styles.segment, activeSegment === id && styles.active)}
      >
        {text}
      </button>
    ))}
  </div>
);
