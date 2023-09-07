import { MouseEvent } from 'react';

// style
import './Toast.css';

interface Props {
  status: string;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<Props> = ({ status, message, onClose }) => {
  const handleButtonCloseClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className={`toast ${status === 'success' ? 'success' : 'error'}`}>
      <div className="notification">
        {status === 'success' && <span className="material-symbols-outlined">done</span>}
        {status === 'error' && <span className="material-symbols-outlined">warning</span>}
        <div className="message">
          <p className="content">{message}</p>
        </div>
        <button
          onClick={handleButtonCloseClick}
          type="button"
          className="btn-close"
          aria-label="Close"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Toast;
