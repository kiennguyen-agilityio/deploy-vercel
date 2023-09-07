import { StoryObj, Meta } from '@storybook/react';
import Select from './Select';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    onColorChange: (value) => console.log(value),
  },
};
