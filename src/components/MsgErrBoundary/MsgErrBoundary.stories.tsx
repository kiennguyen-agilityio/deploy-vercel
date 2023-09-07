import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import MsgErrBoundary from './MsgErrBoundary';

export default {
  title: 'Components/MsgErrBoundary',
  component: MsgErrBoundary,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof MsgErrBoundary>;

export const Default: Story = {};
