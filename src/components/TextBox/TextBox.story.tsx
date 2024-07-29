import { useState } from 'react';
import { TextBox } from './TextBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/TextBox',
  component: TextBox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextBox>;

export default meta;

export const Base: StoryObj<typeof TextBox> = {
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');

    return <TextBox {...props} value={value} onUpdate={setValue} />;
  },
};
