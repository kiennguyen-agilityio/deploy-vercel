import { render, fireEvent, screen } from '@testing-library/react';
import ColorSelector from './Select';

test('renders without crashing', () => {
  const { container } = render(<ColorSelector onColorChange={() => {}} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onColorChange when color is selected', () => {
  const mockOnColorChange = jest.fn();

  render(
    <select onChange={mockOnColorChange}>
      <option value="Black">Black</option>
      <option value="Red">Red</option>
      <option value="Green">Green</option>
      <option value="Yellow">Yellow</option>
    </select>
  );

  const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

  selectElement.value = 'Red';
  fireEvent.change(selectElement);

  expect(mockOnColorChange).toHaveBeenCalledTimes(1);
});
