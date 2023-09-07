import './index.css';

interface Props {
  category: string;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<Props> = ({ category, selectedCategory, onSelectCategory }) => {
  return (
    <div className="sub-title" onClick={() => onSelectCategory(category)} aria-hidden="true">
      <span
        className={`material-symbols-outlined ${selectedCategory === category ? 'rotate' : ''}`}
        data-testid="expand-subcategory"
      >
        expand_more
      </span>
      <span className="dropdown-text" data-testid="expand-subcategory">
        {category}
      </span>
    </div>
  );
};

export default CategoryList;
