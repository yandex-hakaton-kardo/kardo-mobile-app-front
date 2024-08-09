import { useState } from 'react';
import { TextInput } from './TextInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextInput>;

export default meta;

export const Base: StoryObj<typeof TextInput> = {
  args: {
    error: 'error text',
    label: 'label',
    hint: 'hint text',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
  render: ({ value: _value, onUpdate: _onUpdate, ...props }) => {
    const [value, setValue] = useState('');

    return <TextInput {...props} value={value} onUpdate={setValue} />;
  },
};
