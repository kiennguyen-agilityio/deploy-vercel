import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
