// helpers
import {
  colorOptions,
  ratingOptions,
  categoryOptions,
  subcategoryOptions,
} from '@/constants/options';

// components
import ColorFilter from '@/pages/HomePage/Filter/Color';
import CategoryFilter from '@/pages/HomePage/Filter/Category';
import RatingFilter from '@/pages/HomePage/Filter/Rating';
import PriceFilter from '@/pages/HomePage/Filter/Price';

// styles
import './Filter.css';

export interface Props {
  selectedColors: string[];
  selectedCategory: string;
  selectedSubcategory: string;
  onColorChange: (colors: string[]) => void;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onSortByPriceAsc: () => void;
  onSortByPriceDesc: () => void;
}

const Filter: React.FC<Props> = ({
  selectedColors,
  selectedCategory,
  selectedSubcategory,
  onColorChange,
  onCategoryChange,
  onSortByPriceAsc,
  onSortByPriceDesc,
  onSubcategoryChange,
}) => {
  const handleSortByPriceAsc = (): void => {
    onSortByPriceAsc();
  };

  const handleSortByPriceDesc = (): void => {
    onSortByPriceDesc();
  };

  const handleCategorySelect = (category: string): void => {
    onCategoryChange(category);
  };

  const handleSubcategorySelect = (subcategory: string): void => {
    onSubcategoryChange(subcategory);
  };

  return (
    <div className="filter-container">
      <h2 className="filter-header">Filter</h2>

      <ColorFilter
        selectedColors={selectedColors}
        onColorChange={onColorChange}
        colorOptions={colorOptions}
      />

      <RatingFilter ratingOptions={ratingOptions} />

      <PriceFilter
        onSortByPriceAsc={handleSortByPriceAsc}
        onSortByPriceDesc={handleSortByPriceDesc}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        categoryOptions={categoryOptions}
        subCategoryOptions={subcategoryOptions}
        selectedSubCategory={selectedSubcategory}
        onSelectSubCategory={handleSubcategorySelect}
      />
    </div>
  );
};

export default Filter;
