import { memo } from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="loading-spinner" />
  </div>
);

export default memo(LoadingSpinner);
