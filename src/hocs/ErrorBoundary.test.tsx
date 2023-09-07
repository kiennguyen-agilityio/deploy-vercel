import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { ReactNode } from 'react';

const defaultProps = {
  fallback: <div>Error fallback</div>,
};

const setup = (children: ReactNode, props = {}) => {
  const mergedProps = { ...defaultProps, ...props };
  return render(<ErrorBoundary {...mergedProps}>{children}</ErrorBoundary>);
};

describe('ErrorBoundary component', () => {
  test('renders children when there is no error', () => {
    const { container } = setup(<div>Child component</div>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders fallback when there is an error', () => {
    console.error = jest.fn();

    const ChildComponent = () => {
      throw new Error('Test error');
    };

    const { container } = setup(<ChildComponent />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
