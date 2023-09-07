import { useContext } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as services from '@/services/api-action';
import * as useSWR from 'swr';

import CartProvider, { CartContext } from '../CartProvider';
import { CART_API } from '@/constants/api';

const MOCK_PRODUCT_DATA = {
  id: '1',
  name: 'Fullset Black Chair & Sofa',
  sale: '360',
  price: 5000,
  discountPercent: 10,
  image: '../src/assets/images/full-black-chair-sofa.png',
  descriptions:
    'black sofa fullset, made of leather selection from the Himalayan mountains. Knitted by the professional hands of housewives. Making a masterpiece of the best sofa in the world. Very soft and comfortable',
  quantity: 2,
  color: 'Red',
  subcategory: 'Office chair',
};

jest.mock('swr', () => {
  const originalModule = jest.requireActual('swr');
  const mockMutate = jest.fn();

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn((_key) => ({ data: 'mockedData' })),
    mutate: mockMutate,
  };
});

describe('CartProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call mutate when add product success', async () => {
    const postProductMock = jest.spyOn(services, 'addToCart');
    postProductMock.mockResolvedValue(MOCK_PRODUCT_DATA);

    const mockMutate = jest.spyOn(useSWR, 'mutate');

    const MockChildren = () => {
      const { onAddToCart } = useContext(CartContext);

      return <button title="Add to cart" onClick={() => onAddToCart(MOCK_PRODUCT_DATA)} />;
    };

    const { getByRole } = render(
      <CartProvider>
        <MockChildren />
      </CartProvider>
    );

    const button = getByRole('button');

    await act(() => {
      fireEvent.click(button);
    });

    expect(mockMutate).toHaveBeenCalledWith(`${CART_API}`);
  });

  it('Should return a message if add product fails', async () => {
    const postProductMock = jest.spyOn(services, 'addToCart');

    postProductMock.mockRejectedValue('Error');

    const MockChildren = () => {
      const { error, onAddToCart } = useContext(CartContext);
      return (
        <>
          <p>{error}</p>
          <button title="Submit" onClick={() => onAddToCart(MOCK_PRODUCT_DATA)} />
        </>
      );
    };

    const { getByRole, getByText } = render(
      <CartProvider>
        <MockChildren />
      </CartProvider>
    );

    const button = getByRole('button');

    await act(() => {
      fireEvent.click(button);
    });

    const error = getByText('Add Cart Fail, Please try again');

    expect(error).toBeInTheDocument();
  });

  it('Should call mutate when delete success', async () => {
    const postProductMock = jest.spyOn(services, 'deleteCartItem');
    postProductMock.mockResolvedValue(MOCK_PRODUCT_DATA);

    const mockMutate = jest.spyOn(useSWR, 'mutate');

    const MockChildren = () => {
      const { onDeleteProductFromCart } = useContext(CartContext);

      return (
        <button title="Submit" onClick={() => onDeleteProductFromCart(MOCK_PRODUCT_DATA.id)} />
      );
    };

    const { getByRole } = render(
      <CartProvider>
        <MockChildren />
      </CartProvider>
    );

    const button = getByRole('button');

    await act(() => {
      fireEvent.click(button);
    });

    expect(mockMutate).toHaveBeenCalledWith(`${CART_API}`);
  });

  it('Should return a message if delete product fails', async () => {
    const postProductMock = jest.spyOn(services, 'deleteCartItem');
    postProductMock.mockRejectedValue('Error');

    const MockChildren = () => {
      const { error, onDeleteProductFromCart } = useContext(CartContext);
      return (
        <>
          <p>{error}</p>
          <button title="Submit" onClick={() => onDeleteProductFromCart(MOCK_PRODUCT_DATA.id)} />
        </>
      );
    };

    const { getByRole, getByText } = render(
      <CartProvider>
        <MockChildren />
      </CartProvider>
    );

    const button = getByRole('button');

    await act(() => {
      fireEvent.click(button);
    });

    const error = getByText('Delete Cart Fail, Please try again');

    expect(error).toBeInTheDocument();
  });

  it('Should call mutate when update success', async () => {
    const postProductMock = jest.spyOn(services, 'updateItem');
    postProductMock.mockResolvedValue(MOCK_PRODUCT_DATA);

    const mockMutate = jest.spyOn(useSWR, 'mutate');

    const MockChildren = () => {
      const { onUpdateCart } = useContext(CartContext);

      const productId = '123';
      const updatedData = { name: 'Updated Product', price: 20 };
      const url = '/api/update-product';

      return <button title="Submit" onClick={() => onUpdateCart(productId, updatedData, url)} />;
    };

    const { getByRole } = render(
      <CartProvider>
        <MockChildren />
      </CartProvider>
    );

    const button = getByRole('button');

    await act(() => {
      fireEvent.click(button);
    });

    expect(mockMutate).toHaveBeenCalledWith(`${CART_API}`);
  });

  it('Should update message error if there is any error', async () => {
    const postProductMock = jest.spyOn(services, 'updateItem');
    postProductMock.mockRejectedValue('Update Cart Fail, Please try again');

    const productId = '123';
    const updatedData = { name: 'Updated Product', price: 20 };
    const url = '/api/update-product';

    const MockChildren = () => {
      const { error, onUpdateCart } = useContext(CartContext);
      return (
        <>
          <p data-testid="error">{error}</p>
          <button title="Submit" onClick={() => onUpdateCart(productId, updatedData, url)} />
        </>
      );
    };

    const { getByRole, getByTestId } = render(
      <CartProvider>
        <MockChildren />
      </CartProvider>
    );

    const button = getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      const error = getByTestId('error');
      expect(error).toHaveTextContent('Update Cart Fail, Please try again');
    });
  });
});
