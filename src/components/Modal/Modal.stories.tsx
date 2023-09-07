import { StoryObj, Meta } from '@storybook/react';

import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: 'Modal Content',
  },
};

export default meta;
