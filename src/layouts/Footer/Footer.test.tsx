import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('display shop name', () => {
    const { getByText } = render(<Footer />);
    const shopName = getByText('Shop Bags');
    expect(shopName).toBeInTheDocument();
  });

  it('displays copyright notice', () => {
    const { getByText } = render(<Footer />);
    const copyright = getByText('2019 © Shopbag - All right reserved');
    expect(copyright).toBeInTheDocument();
  });
});
