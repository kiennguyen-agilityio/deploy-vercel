import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('Testing spinner', () => {
  it('Should render component', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container).toMatchSnapshot();
  });
});
