import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders without crashing', () => {
  const { container } = render(<SearchBar searchValue="" onSetSearchValue={() => {}} />);
  expect(container.firstChild).toMatchSnapshot();
});
