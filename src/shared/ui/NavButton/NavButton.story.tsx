import { BrowserRouter } from 'react-router-dom';
import { HeartIcon } from '../icons';
import { NavButton } from './NavButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/NavButton',
  component: NavButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    Icon: HeartIcon,
    to: '/',
    text: 'Избранное',
  },
  render: props => (
    <BrowserRouter>
      <NavButton {...props} />
    </BrowserRouter>
  ),
};
