import { render, waitFor } from '@testing-library/react';
import { ListProductProvider } from '../ProductProvider';

jest.mock('@/services/api-action', () => ({
  getProductById: jest.fn(() => Promise.resolve()),
}));

describe('ListProductProvider', () => {
  it('renders children and provides context values', async () => {
    const { getByText } = render(
      <ListProductProvider>
        <div data-testid="test-child">Test Child</div>
      </ListProductProvider>
    );
    await waitFor(() => {
      expect(getByText('Test Child')).toBeInTheDocument();
    });
  });
});
