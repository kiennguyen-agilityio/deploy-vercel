import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import ProductCard from './ProductCard';

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: 'Product Name',
      sale: '1',
      price: 100,
      discountPercent: 20,
      image: 'src/assets/images/black-chair.png',
      descriptions: 'Product descriptions',
      quantity: 5,
      color: 'Red',
      subcategory: 'Electronics',
    },
  },
};
