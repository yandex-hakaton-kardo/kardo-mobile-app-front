import { useState } from 'react';
import { Select } from './Select';
import type { Meta, StoryFn } from '@storybook/react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;

export const Base: StoryFn<typeof meta> = () => {
  const [value, setValue] = useState('1');

  return (
    <Select
      value={value}
      onUpdate={setValue}
      label="Тип конкурса"
      placeholder="Выберите тип конкурса"
      options={[
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
      ]}
    />
  );
};
