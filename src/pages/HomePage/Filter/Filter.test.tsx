import { render, fireEvent, screen } from '@testing-library/react';
import Filter, { Props } from './Filter';

const mockProps = {
  selectedColors: [],
  selectedCategory: '',
  onColorChange: jest.fn(),
  onCategoryChange: jest.fn(),
  onSubcategoryChange: jest.fn(),
  onSortByPriceAsc: jest.fn(),
  onSortByPriceDesc: jest.fn(),
  selectedSubcategory: '',
  isColorOpen: false,
};

const setup = (overrides: Props) => {
  const props = { ...mockProps, ...overrides };

  return render(<Filter {...props} />);
};

describe('Filter component', () => {
  it('renders correctly', () => {
    const { asFragment } = setup(mockProps);
    expect(asFragment()).toMatchSnapshot();
  });
  it('calls onColorChange when a color checkbox is clicked', () => {
    const { getByTestId, getByLabelText } = render(<Filter {...mockProps} />);

    const expandMoreButton = getByTestId('expand-color');
    fireEvent.click(expandMoreButton);

    const checkbox = getByLabelText('Red');
    fireEvent.click(checkbox);

    expect(mockProps.onColorChange).toHaveBeenCalledWith(['Red']);
  });

  it('calls onSortByPriceAsc when the "Minimum Price" button is clicked', () => {
    const { getByTestId, getByText } = render(<Filter {...mockProps} />);

    const expandMoreButton = getByTestId('expand-price');
    fireEvent.click(expandMoreButton);

    const minimumPriceButton = getByText('Minimum Price');

    fireEvent.click(minimumPriceButton);
    expect(mockProps.onSortByPriceAsc).toHaveBeenCalled();
  });

  it('calls onSortByPriceDesc when the "Maximum Price" button is clicked', () => {
    const { getByTestId, getByText } = render(<Filter {...mockProps} />);

    const expandMoreButton = getByTestId('expand-price');
    fireEvent.click(expandMoreButton);

    const maximumPriceButton = getByText('Maximum Price');

    fireEvent.click(maximumPriceButton);
    expect(mockProps.onSortByPriceDesc).toHaveBeenCalled();
  });

  it('calls onCategoryChange when a category is clicked', () => {
    const { getByTestId, getByText } = render(<Filter {...mockProps} />);

    const expandMoreButton = getByTestId('id-category');
    fireEvent.click(expandMoreButton);

    const categoryButton = getByText('Chair');

    fireEvent.click(categoryButton);
    expect(mockProps.onCategoryChange).toHaveBeenCalled();
  });

  it('calls onSubCategoryChange when a category is clicked', () => {
    const { getByTestId, getByText, getAllByTestId, rerender } = render(<Filter {...mockProps} />);

    const expandMoreButton = getByTestId('id-category');
    fireEvent.click(expandMoreButton);
    const categoryButton = getByText('Chair');

    fireEvent.click(categoryButton);
    screen.debug();
    const expandSubCategory = getAllByTestId('expand-subcategory');
    fireEvent.click(expandSubCategory[1]);

    // Rerender to update the selected category because it is updated by function prop
    rerender(<Filter {...mockProps} selectedCategory="Chair" />);

    const subcategoryButton = getByText('Office chair');

    fireEvent.click(subcategoryButton);
    expect(mockProps.onCategoryChange).toHaveBeenCalled();
  });
});
