import type { Preview } from '@storybook/react';
import '../src/app/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'light',
          value: '#dcdcdc',
        },
        {
          name: 'dark',
          value: '#393939',
        },
      ],
    },
  },
};

export default preview;
