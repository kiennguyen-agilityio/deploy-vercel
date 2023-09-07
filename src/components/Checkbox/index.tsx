import { memo } from 'react';

interface Props {
  id: string;
  value: string;
  checked?: boolean;
  labelText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<Props> = ({ id, value, checked = false, onChange, labelText = '' }) => {
  return (
    <label htmlFor={id} key={id} className="color-dropdown">
      <input type="checkbox" id={id} value={value} checked={checked} onChange={onChange} />
      <span className="dropdown-text">{value}</span>
      <span className="dropdown-text">{labelText}</span>
    </label>
  );
};

export default memo(Checkbox);
