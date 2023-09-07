import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';

export default {
  title: 'Layouts/DefaultLayout',
  component: DefaultLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof DefaultLayout>;

export const Default: Story = {
  args: {
    children: <div>This is the main content</div>,
  },
};
