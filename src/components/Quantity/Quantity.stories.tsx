import { StoryObj, Meta } from '@storybook/react';
import QuantityControl from './Quantity';

export default {
  title: 'Components/QuantityControl',
  component: QuantityControl,
} as Meta;

type Story = StoryObj<typeof QuantityControl>;

export const Default: Story = {
  args: {
    quantity: 0,
    onQuantityChange: (value) => {
      console.log('Quantity change:', value);
    },
  },
};
