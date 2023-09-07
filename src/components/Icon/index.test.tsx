import { render } from '@testing-library/react';
import Icon from './index';

describe('Icon', () => {
  it('should render correctly', () => {
    const { container } = render(<Icon icon={<svg />} className="icon-class" />);
    expect(container).toMatchSnapshot();
  });
});
