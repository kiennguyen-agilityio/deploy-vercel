import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// contexts
import { ToastProvider } from '@/contexts/ToastProvider';
import { LoadingProvider } from '@/contexts/LoadingProvider';
import CartProvider from '@/contexts/CartProvider';

// helpers
import { productList } from '@/helper/product';

// components
import ProductCart from './ProductCart';

export default {
  title: 'Components/ProductCart',
  component: ProductCart,
  decorators: [
    (StoryComponent) => (
      <ToastProvider>
        <CartProvider>
          <LoadingProvider>
            <MemoryRouter initialEntries={['/cart']}>
              <Routes>
                <Route path="/cart" element={<StoryComponent />} />
              </Routes>
            </MemoryRouter>
          </LoadingProvider>
        </CartProvider>
      </ToastProvider>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof ProductCart>;

export const Default: Story = {
  args: {
    cart: productList,
  },
};
