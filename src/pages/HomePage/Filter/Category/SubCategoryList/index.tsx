import './index.css';

interface Props {
  subCategory: string;
  selectedCategory: string;
  selectedSubCategory: string;
  onSelectSubCategory: (subcategory: string) => void;
}

const SubCategoryList: React.FC<Props> = ({
  selectedSubCategory,
  subCategory,
  onSelectSubCategory,
}) => {
  return (
    <div className="subcategory-list">
      <div
        key={subCategory}
        onClick={() => onSelectSubCategory(subCategory)}
        aria-hidden="true"
        className={`subcategory ${selectedSubCategory === subCategory ? 'active' : ''}`}
      >
        {subCategory}
      </div>
    </div>
  );
};

export default SubCategoryList;
