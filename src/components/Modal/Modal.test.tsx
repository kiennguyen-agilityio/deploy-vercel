import { fireEvent, render } from '@testing-library/react';
import Modal from './Modal';

const onCloseMock = jest.fn();
const setup = (props = {}) => {
  return render(
    <Modal isOpen={true} onClose={onCloseMock} {...props}>
      <div>Modal content</div>
    </Modal>
  );
};
describe('Modal component', () => {
  it('renders Modal component correctly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('closes the modal when close button is clicked', () => {
    const { container } = setup();
    const closeButton = container.querySelector('.modal-close-button') as HTMLButtonElement;

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
