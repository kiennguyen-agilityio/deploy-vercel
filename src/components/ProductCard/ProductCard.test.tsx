import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

const product = {
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
};

const setup = (props = {}) => {
  return render(
    <MemoryRouter>
      <ProductCard product={product} {...props} />
    </MemoryRouter>
  );
};

describe('ProductCard component', () => {
  it('renders ProductCard component correctly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('renders product information correctly', () => {
    const { getByText } = setup();
    expect(getByText(product.name)).toBeInTheDocument();
    expect(getByText(`(${product.sale} sells)`)).toBeInTheDocument();
    expect(getByText(`$${product.price.toFixed(0)}`)).toBeInTheDocument();
  });

  it('renders correct number of stars based on rating', () => {
    const { container } = setup();
    const ratingContainer = container.querySelector('.rating');
    expect(ratingContainer).toMatchSnapshot();
  });

  it('renders correct label when has discount', () => {
    const { getByText, queryByText } = setup();

    const hasDiscount = product.discountPercent > 0;
    const discountedPrice = product.price - product.price * (product.discountPercent / 100);

    expect(
      getByText(`$${hasDiscount ? discountedPrice.toFixed(0) : product.price.toFixed(0)}`)
    ).toBeInTheDocument();

    expect(getByText(`-${product.discountPercent}%`)).toBeInTheDocument();
    expect(queryByText('Sold out')).toBeNull();
  });

  it('renders correct link to product detail page', () => {
    const { getByText } = setup();
    const link = getByText(product.name).closest('a');

    expect(link).toHaveAttribute('href', `/products/${product.id}`);
  });
});
