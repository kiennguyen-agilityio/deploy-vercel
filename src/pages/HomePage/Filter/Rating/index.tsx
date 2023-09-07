import { useState } from 'react';

// components
import Checkbox from '@/components/Checkbox';
import FilterTitle from '@/pages/HomePage/Filter/Title';

// styles
import './index.css';

interface Props {
  ratingOptions: string[];
}

const RatingFilter: React.FC<Props> = ({ ratingOptions }) => {
  const [isRatingOpen, setIsRatingOpen] = useState<boolean>(false);

  const handleDropdownOpen = (value: boolean): void => {
    setIsRatingOpen(value);
  };

  return (
    <div className="filter-rating">
      <FilterTitle title="Rating" icon="expand_more" onDropdownOpen={handleDropdownOpen} />

      {isRatingOpen && (
        <div className="rating">
          {ratingOptions.map((rating) => (
            <Checkbox key={rating} id={rating} value={rating} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingFilter;
