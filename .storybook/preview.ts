import type { Preview } from '@storybook/react';
import '../src/assets/styles/main.css';
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },  
  },
};

export default preview;
