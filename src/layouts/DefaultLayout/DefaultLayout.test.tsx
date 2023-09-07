import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartProvider from '@/contexts/CartProvider';
import DefaultLayout from './DefaultLayout';

test('renders correctly with children', () => {
  const { container } = render(
    <MemoryRouter>
      <CartProvider>
        <DefaultLayout>
          <div>Child component</div>
        </DefaultLayout>
      </CartProvider>
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
