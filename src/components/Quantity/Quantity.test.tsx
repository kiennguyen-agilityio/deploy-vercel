import { fireEvent, render } from '@testing-library/react';
import QuantityControl from './Quantity';

const defaultProps = {
  quantity: 10,
  onQuantityChange: jest.fn(),
};

const setup = (props = {}) => {
  const mergedProps = { ...defaultProps, ...props };
  return render(<QuantityControl {...mergedProps} />);
};

describe('QuantityControl component', () => {
  it('renders correctly', () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with quantity of value =  0', () => {
    const { container } = setup({ quantity: 0 });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onQuantityChange with -1 when "-" button is clicked', () => {
    const onQuantityChange = jest.fn();
    const { getByText } = setup({ onQuantityChange });

    const minusButton = getByText('-');
    fireEvent.click(minusButton);

    expect(onQuantityChange).toHaveBeenCalledWith(-1);
  });

  it('calls onQuantityChange with 1 when "+" button is clicked', () => {
    const onQuantityChange = jest.fn();
    const { getByText } = setup({ onQuantityChange });

    const plusButton = getByText('+');
    fireEvent.click(plusButton);

    expect(onQuantityChange).toHaveBeenCalledWith(1);
  });
});
