import { useState } from 'react';

// components
import FilterTitle from '@/pages/HomePage/Filter/Title';

// styles
import './index.css';

interface Props {
  onSortByPriceAsc: () => void;
  onSortByPriceDesc: () => void;
}

const PriceFilter: React.FC<Props> = ({ onSortByPriceAsc, onSortByPriceDesc }) => {
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(false);

  const handleDropdownOpen = (value: boolean): void => {
    setIsPriceOpen(value);
  };

  return (
    <div className="filter-price">
      <FilterTitle onDropdownOpen={handleDropdownOpen} title="Price" icon="expand_more" />
      {isPriceOpen && (
        <div className="dropdown-content">
          <button className="price-button" type="button" onClick={onSortByPriceDesc}>
            <div className="price-button-icon">$</div>
            <div className="price-button-label">Maximum Price</div>
          </button>
          <button className="price-button" type="button" onClick={onSortByPriceAsc}>
            <div className="price-button-icon">$</div>
            <div className="price-button-label">Minimum Price</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
