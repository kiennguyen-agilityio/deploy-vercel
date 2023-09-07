import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// constants
import ROUTE from '@/constants/route';
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from '@/enums/index';

// components
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

// style
import './MsgErrBoundary.css';

const MsgErrBoundary: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleCloseModal = (): void => {
    setIsOpen(false);
    navigate(ROUTE.HOMEPAGE);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div className="error-fallback-container">
        <h2 className="error-fallback-title">Oops! Something went wrong</h2>
        <p className="error-fallback-description">
          We&apos;re sorry, but an error occurred while processing your request.
        </p>
        <Button
          label="Back to home page"
          onClick={handleCloseModal}
          variant={BUTTON_VARIANTS.PRIMARY}
          isDisabled={false}
          isLoading={false}
          size={BUTTON_SIZES.SMALL}
          color={BUTTON_COLORS.DEFAULT}
        />
      </div>
    </Modal>
  );
};

export default MsgErrBoundary;
