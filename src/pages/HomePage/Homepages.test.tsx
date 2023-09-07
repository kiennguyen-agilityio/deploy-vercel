import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HomePage from '.';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState: any) => [initialState, jest.fn()],
}));
describe('HomePage', () => {
  test('renders the component correctly', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
