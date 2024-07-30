import { useState } from 'react';
import { Password } from './Password';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Inputs/PasswordInput',
  component: Password,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Password>;

export default meta;

export const Base: StoryObj<typeof Password> = {
  args: {
    hint: 'hint',
    error: 'error text',
    label: 'label',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
  render: ({ value: _value, onUpdate: _onUpdate, ...props }) => {
    const [value, setValue] = useState('');

    return <Password {...props} value={value} onUpdate={setValue} />;
  },
};
