import { renderHook } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from '@/contexts/ToastProvider';

describe('useToast', () => {
  test('should throw an error if used outside ToastProvider', () => {
    const Component: React.FC = () => {
      useToast();
      return null;
    };

    expect(() => {
      render(<Component />);
    }).toThrowError('useToast must be used within a ToastProvider');
  });

  test('should return the toast context when used within ToastProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current.toast).toEqual({
      status: '',
      message: '',
      openPopup: false,
    });
    expect(typeof result.current.setToast).toBe('function');
  });
});

describe('ToastProvider', () => {
  test('should render its children', () => {
    render(
      <ToastProvider>
        <div data-testid="child">Child Component</div>
      </ToastProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
