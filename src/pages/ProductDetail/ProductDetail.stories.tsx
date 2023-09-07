import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// contexts
import { ToastProvider } from '@/contexts/ToastProvider';
import CartProvider from '@/contexts/CartProvider';
import { LoadingProvider } from '@/contexts/LoadingProvider';

// helpers
import { productList } from '@/helper/product';

// components
import ProductDetail from './ProductDetail';

export default {
  title: 'Components/ProductDetail',
  component: ProductDetail,
  decorators: [
    (StoryComponent) => (
      <ToastProvider>
        <CartProvider>
          <LoadingProvider>
            <MemoryRouter initialEntries={['/products/2']}>
              <Routes>
                <Route path="/products/:productId" Component={StoryComponent} />
              </Routes>
            </MemoryRouter>
          </LoadingProvider>
        </CartProvider>
      </ToastProvider>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof ProductDetail>;

export const Default: Story = {
  args: {
    productId: productList[1].id,
    name: productList[1].name,
    sale: productList[1].sale,
    price: productList[1].price,
    discountPercent: productList[1].discountPercent,
    image: productList[1].image,
    descriptions: productList[1].descriptions,
    quantity: productList[1].quantity,
    color: productList[1].color,
    subcategory: productList[1].subcategory,
  },
};
