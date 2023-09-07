import { memo, useState } from 'react';

// helpers
import { colorSelect } from '@/constants/options';
import './Select.css';

interface Props {
  onColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ColorSelector: React.FC<Props> = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
    onColorChange(event);
  };

  return (
    <div className="product-color">
      <p>Color</p>
      <div className="select-wrapper">
        <select value={selectedColor} onChange={handleColorChange}>
          {colorSelect.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default memo(ColorSelector);
