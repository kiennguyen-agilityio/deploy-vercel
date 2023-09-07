import { memo } from 'react';

// style
import './SearchBar.css';

interface Props {
  searchValue: string;
  onSetSearchValue: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchValue, onSetSearchValue }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onSetSearchValue(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input className="search-bar" onChange={handleSearch} value={searchValue} />
      <i className="search-icon fa-sharp fa-solid fa-search" />
    </div>
  );
};

export default memo(SearchBar);
