import { useState } from 'react';

// components
import FilterTitle from '@/pages/HomePage/Filter/Title';
import CategoryList from './CategoryList';
import SubCategoryList from './SubCategoryList';

// styles
import './index.css';

interface Props {
  selectedCategory: string;
  categoryOptions: string[];
  selectedSubCategory: string;
  subCategoryOptions: Record<string, string[]>;
  onSelectCategory: (category: string) => void;
  onSelectSubCategory: (subcategory: string) => void;
}

const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  categoryOptions,
  subCategoryOptions,
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  const handleDropdownOpen = (value: boolean): void => {
    setIsCategoryOpen(value);
  };

  return (
    <div className="filter-section">
      <FilterTitle onDropdownOpen={handleDropdownOpen} title="Category" icon="expand_more" />

      {isCategoryOpen && (
        <div className="dropdown-content">
          {categoryOptions.map((category) => (
            <div className="subcategory-group" key={category}>
              <CategoryList
                category={category}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
              />
              {selectedCategory === category && (
                <div className="subcategory-list">
                  {subCategoryOptions[category].map((subcategory) => (
                    <SubCategoryList
                      key={subcategory}
                      subCategory={subcategory}
                      selectedSubCategory={selectedSubCategory}
                      onSelectSubCategory={onSelectSubCategory}
                      selectedCategory={selectedCategory}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
