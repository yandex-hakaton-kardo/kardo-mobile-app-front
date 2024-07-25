import React from 'react';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onClick: () => {},
    view: 'normal',
    size: 'large',
    wide: false,
    disabled: false,
    children: 'Text',
  },
};

export const Gallery: Story = {
  args: {
    children: '',
    onClick: () => {},
  },
  render: ({ onClick }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', alignItems: 'center' }}>
      {(['normal', 'contrast', 'action', 'flat', 'raised'] as const).map(view => (
        <React.Fragment key={view}>
          {(['small', 'medium', 'large'] as const).map(size => (
            <Button view={view} size={size} wide onClick={onClick} key={`${view}-${size}`}>
              {view}-{size}
            </Button>
          ))}
          <Button view={view} size="large" wide disabled onClick={onClick} key={`${view}-disabled`}>
            {view}-large-disabled
          </Button>
        </React.Fragment>
      ))}
    </div>
  ),
};
