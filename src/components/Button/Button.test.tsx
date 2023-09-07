import { render, screen, fireEvent } from '@testing-library/react';
import Button, { Props } from './Button';
import { BUTTON_VARIANTS } from '@/enums/index';
const setup = (props = {}) => {
  const defaultProps: Props = {
    label: 'Submit',
    variant: BUTTON_VARIANTS.PRIMARY,
    onClick: jest.fn(),
    isLoading: false,
    leftIcon: null,
    ...props,
  };

  render(<Button {...defaultProps} />);
};

describe('Button component', () => {
  test('renders button correctly', () => {
    setup();
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toMatchSnapshot();
  });

  test('renders button with secondary variant', () => {
    setup({ variant: 'secondary' });

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toMatchSnapshot();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    setup({ onClick: handleClick });

    const buttonElement = screen.getByText('Submit');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders button with loading spinner when isLoading is true', () => {
    setup({ isLoading: true });

    const loaderElement = screen.getByRole('button');
    expect(loaderElement).toBeInTheDocument();
  });

  test('renders button with left icon', () => {
    const leftIcon = <i className="fa fa-arrow-left" data-testid="left-icon" />;
    setup({ leftIcon });

    const iconElement = screen.getByTestId('left-icon');
    expect(iconElement).toMatchSnapshot();
  });
});
