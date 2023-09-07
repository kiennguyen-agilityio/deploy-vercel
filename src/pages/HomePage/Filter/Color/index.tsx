import { useState } from 'react';

// components
import Checkbox from '@/components/Checkbox';
import FilterTitle from '@/pages/HomePage/Filter/Title';

// styles
import './index.css';

interface Props {
  selectedColors: string[];
  colorOptions: string[];
  onColorChange: (colors: string[]) => void;
}

const ColorFilter: React.FC<Props> = ({ selectedColors, onColorChange, colorOptions }) => {
  const [isColorOpen, setIsColorOpen] = useState<boolean>(false);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const color = event.target.value;
    if (selectedColors.includes(color)) {
      const updatedColors = selectedColors.filter((it) => it !== color);
      onColorChange(updatedColors);
    } else {
      const updatedColors = [...selectedColors, color];
      onColorChange(updatedColors);
    }
  };

  const handleDropdownOpen = (value: boolean): void => {
    setIsColorOpen(value);
  };

  return (
    <div className="filter-section">
      <FilterTitle onDropdownOpen={handleDropdownOpen} title="Color" icon="expand_more" />

      {isColorOpen && (
        <div className="dropdown-content">
          {colorOptions.map((color) => (
            <Checkbox
              key={color}
              id={color}
              value={color}
              checked={selectedColors.includes(color)}
              onChange={handleColorChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorFilter;
