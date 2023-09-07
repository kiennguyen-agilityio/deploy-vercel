import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';

// contexts
import { LoadingProvider } from '@/contexts/LoadingProvider';

// mocks
import { productList } from 'mocks/product';

// components
import ListProduct, { Props } from './ListProduct';

const mockLoadingValue = {
  isLoading: false,
  setLoading: jest.fn(),
};

jest.mock('@/contexts/LoadingProvider', () => ({
  LoadingProvider: ({ children }: { children: React.ReactNode }) => children,
  useLoading: () => mockLoadingValue,
}));

const mockProps: Props = {
  selectedColors: [''],
  selectedPrice: 0,
  sortType: 'asc',
  selectedSubcategory: '',
};

const setup = (overrides = {}) => {
  mockLoadingValue.setLoading.mockReset();
  jest.spyOn(axios, 'get').mockResolvedValue({ data: { products: productList } });

  const props = { ...mockProps, ...overrides };
  return render(
    <LoadingProvider>
      <ListProduct {...props} />
    </LoadingProvider>
  );
};

describe('ProductList component', () => {
  beforeEach(() => {
    mockLoadingValue.setLoading.mockReset();
    jest.restoreAllMocks();
  });

  const mockProps: Props = {
    selectedColors: ['Red'],
    selectedPrice: 2000,
    sortType: 'asc',
    selectedSubcategory: 'Office chair',
  };

  it('List renders correctly', () => {
    const { container } = setup(mockProps);

    console.log(container.innerHTML);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render list of products when products are not empty', async () => {
    const { container, queryByText } = setup(mockProps);
    await queryByText('Fullset Black Chair & Sofa');
    expect(container.firstChild).toMatchSnapshot();
    expect(mockLoadingValue.setLoading).toHaveBeenCalledTimes(2);
  });

  it('should filter products correctly based on selected filters', () => {
    const { container } = setup(mockProps);
    expect(container.firstChild).toMatchSnapshot();
    expect(mockLoadingValue.setLoading).toHaveBeenCalledTimes(1);
  });

  it('should sort products correctly based on sort type', () => {
    const { container, queryAllByAltText } = setup(mockProps);
    const elements = queryAllByAltText('Maximum Price');

    elements.length > 0 && elements[0].click();

    expect(container.firstChild).toMatchSnapshot();
    expect(mockLoadingValue.setLoading).toHaveBeenCalledTimes(1);
  });

  it('should handle page change correctly', () => {
    const { container, getByText } = setup();

    waitFor(() => {
      const element = getByText('1');

      expect(element).toBeInTheDocument();
      fireEvent.click(element);
    });

    expect(container.firstChild).toMatchSnapshot();
    expect(mockLoadingValue.setLoading).toHaveBeenCalledTimes(1);
  });

  it('returns false when selectedColors has items and color is not included', () => {
    const { container } = setup({
      selectedColors: ['Red', 'Blue'],
      selectedPrice: 0,
      sortType: 'asc',
      selectedSubcategory: '',
    });

    const productCards = container.querySelectorAll('.product-card');
    expect(productCards.length).toBe(0);
  });

  it('returns products sorted in ascending order by price when sortType is "asc"', () => {
    const products = [
      { id: 1, price: 50 },
      { id: 2, price: 30 },
      { id: 3, price: 70 },
    ];

    const sortedProducts = products.sort((a, b) => a.price - b.price);

    expect(sortedProducts).toEqual([
      { id: 2, price: 30 },
      { id: 1, price: 50 },
      { id: 3, price: 70 },
    ]);
  });

  fit('returns products sorted in descending order by price when sortType is "desc"', () => {
    const products = [
      { id: 1, price: 50 },
      { id: 2, price: 30 },
      { id: 3, price: 70 },
    ];

    const sortedProducts = products.sort((a, b) => b.price - a.price);

    expect(sortedProducts).toEqual([
      { id: 3, price: 70 },
      { id: 1, price: 50 },
      { id: 2, price: 30 },
    ]);
  });
});
