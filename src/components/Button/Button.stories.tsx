import type { Meta, StoryObj } from '@storybook/react';

import { BUTTON_VARIANTS } from '@/enums/index';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: BUTTON_VARIANTS.PRIMARY,
  },
};

export const Secondary: Story = {
  render: () => <Button label="Button" variant={BUTTON_VARIANTS.SECONDARY} />,
};

export default meta;
