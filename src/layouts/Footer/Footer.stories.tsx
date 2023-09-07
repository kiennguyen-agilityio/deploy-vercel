import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
