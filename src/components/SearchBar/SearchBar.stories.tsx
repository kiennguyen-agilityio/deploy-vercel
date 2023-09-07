import { StoryObj, Meta } from '@storybook/react';
import SearchBar from './SearchBar';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
} as Meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    searchValue: '',
    onSetSearchValue: (value) => console.log(value),
  },
};
