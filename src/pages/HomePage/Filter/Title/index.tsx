import { useState } from 'react';
import './index.css';

interface Props {
  onDropdownOpen: (value: boolean) => void;
  title: string;
  icon: string;
}

const FilterTitle: React.FC<Props> = ({ title, icon, onDropdownOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    onDropdownOpen(!isDropdownOpen);
  };

  return (
    <h3
      className={`filter-title ${isDropdownOpen ? 'active' : ''}`}
      onClick={handleDropdown}
      aria-hidden="true"
      data-testid={`id-${title.toLowerCase()}`}
    >
      {title}
      <span className={`material-symbols-outlined ${isDropdownOpen ? 'rotate' : ''}`}>{icon}</span>
    </h3>
  );
};

export default FilterTitle;
