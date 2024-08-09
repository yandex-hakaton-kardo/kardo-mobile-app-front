import { useState } from 'react';
import { Modal } from './Modal';
import type { Meta, StoryFn } from '@storybook/react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;

export const Base: StoryFn<typeof meta> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        open
      </button>
      <Modal show={open} onClose={() => setOpen(false)}>
        content
      </Modal>
    </div>
  );
};
