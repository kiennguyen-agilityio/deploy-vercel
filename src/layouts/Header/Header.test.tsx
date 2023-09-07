import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// contexts
import { CartContext, CartContextProps } from '@/contexts/CartProvider';
import { SearchContext, SearchContextProps } from '@/contexts/SearchProvider';

// components
import Header from './Header';
import Product from '@/interface/Product';

describe('Header component', () => {
  const defaultProps = {
    cart: [
      {
        id: 1,
        name: 'Fullset Black Chair & Sofa',
        sale: '350',
        price: 5000,
        discountPercent: 10,
        image: '../src/assets/images/full-black-chair-sofa.png',
        descriptions:
          'black sofa fullset, made of leather selection from the Himalayan mountains. Knitted by the professional hands of housewives. Making a masterpiece of the best sofa in the world. Very soft and comfortable',
        quantity: 2,
        color: 'Red',
        subcategory: 'Office chair',
      },
    ],
    onSearchValue: jest.fn(),
    onResetSearchValue: jest.fn(),
  };

  interface Props {
    cart: Product[];
    onSearchValue: () => void;
    onResetSearchValue: () => void;
  }

  const setup = (props: Props = defaultProps) => {
    const cartContextValue: CartContextProps = {
      cart: props.cart || defaultProps.cart,
      addToCart: jest.fn(),
      updateProductInCart: jest.fn(),
      updateProductDetail: jest.fn(),
      deleteProductFromCart: jest.fn(),
    };

    const searchContextValue: SearchContextProps = {
      searchValue: '',
      onSearchValue: props.onSearchValue || defaultProps.onSearchValue,
      onResetSearchValue: props.onResetSearchValue || defaultProps.onResetSearchValue,
    };

    return render(
      <BrowserRouter basename="/">
        <CartContext.Provider value={cartContextValue}>
          <SearchContext.Provider value={searchContextValue}>
            <Header />
          </SearchContext.Provider>
        </CartContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders correctly', () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('displays the correct number of items in the cart', () => {
    const { getByText } = setup();
    const cartItemCount = getByText((content, element) => {
      if (!element) return false;
      const classNames = element.getAttribute('className');
      if (classNames && classNames.includes('cart-item-count')) {
        return true;
      }
      const normalizedContent = content.trim();
      if (normalizedContent === '1') {
        return true;
      }
      return false;
    });
    expect(cartItemCount).toBeInTheDocument();
  });

  it('calls the onSearchValue function with the correct value when typing in the search input', () => {
    const { getByRole } = setup();
    const searchInput = getByRole('textbox');
    const searchValue = 'Product';
    fireEvent.change(searchInput, { target: { value: searchValue } });
    expect(defaultProps.onSearchValue).toHaveBeenCalledWith(searchValue);
  });
});
