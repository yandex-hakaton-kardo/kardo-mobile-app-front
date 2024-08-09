import clsx from 'clsx';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

export interface ModalProps {
  show?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal = ({ show, onClose, children }: ModalProps) =>
  createPortal(
    <div className={clsx(styles.container, show && styles.visible)} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
