import { useState, lazy, Suspense, useCallback } from 'react';

// components
import Filter from '@/pages/HomePage/Filter/Filter';
import LoadingSpinner from '@/components/Common/LoadingSpinner/LoadingSpinner';

// layouts
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout';

// style
import './index.css';

/**
 * Represents the ProductList component.
 *
 * This component is used to lazy load the ListProduct component.
 */
const ProductList = lazy(() => import('@/components/ListProduct/ListProduct'));

const HomePage: React.FC = () => {
  const [selectedPrice] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | ''>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  /**
   * Handles the change of colors.
   * @param colors - An array of color strings.
   */
  const handleColorChange = useCallback((colors: string[]): void => {
    setSelectedColors(colors);
  }, []);

  /**
   * Handles the change of category.
   * @param category - The selected category.
   */

  const handleCategoryChange = useCallback((category: string): void => {
    setSelectedCategory(category);
  }, []);

  /**
   * Handles the sorting of items by price in ascending order.
   */
  const handleSortByPriceAsc = useCallback((): void => {
    setSortType('asc');
  }, []);

  /**
   * Handles the sorting of items by price in descending order.
   */

  const handleSortByPriceDesc = useCallback((): void => {
    setSortType('desc');
  }, []);

  /**
   * Handles the change of subcategory.
   * @param subcategory - The selected subcategory.
   */
  const handleSubcategoryChange = useCallback((subcategory: string): void => {
    setSelectedSubcategory(subcategory);
  }, []);

  return (
    <DefaultLayout>
      <h2 className="product-title">Product</h2>
      <div className="product-content">
        <Filter
          selectedColors={selectedColors}
          selectedCategory={selectedCategory}
          onColorChange={handleColorChange}
          onCategoryChange={handleCategoryChange}
          onSortByPriceAsc={handleSortByPriceAsc}
          onSortByPriceDesc={handleSortByPriceDesc}
          selectedSubcategory={selectedSubcategory}
          onSubcategoryChange={handleSubcategoryChange}
        />

        {/* Apply suspense for ProductList component */}
        <Suspense fallback={<LoadingSpinner />}>
          <ProductList
            selectedColors={selectedColors}
            selectedPrice={selectedPrice}
            sortType={sortType}
            selectedSubcategory={selectedSubcategory}
          />
        </Suspense>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
