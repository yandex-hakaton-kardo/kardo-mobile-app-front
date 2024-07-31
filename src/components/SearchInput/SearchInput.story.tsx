import { SearchInput } from './SearchInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Inputs/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onUpdate: () => {},
    placeholder: 'Поиск',
    disabled: false,
  },
};
