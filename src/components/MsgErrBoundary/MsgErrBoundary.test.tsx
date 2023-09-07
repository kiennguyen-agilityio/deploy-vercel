import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MsgErrBoundary from './MsgErrBoundary';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

it('renders MsgErrBoundary component correctly', () => {
  const { container, getByText } = render(
    <MemoryRouter>
      <MsgErrBoundary />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();

  const backButton = getByText('Back to home page');
  fireEvent.click(backButton);
  expect(mockNavigate).toHaveBeenCalledWith('/');
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
