import { useContext, useState } from 'react';

// constants
import ERROR_MESSAGES from '@/constants/errorMsg';

// contexts
import { SearchContext } from '@/contexts/SearchProvider';
import { ListProductContext } from '@/contexts/ProductProvider';

// enums
import { SORT } from '@/enums/index';

// interface
import Product from '@/interface/Product';

// components
import ProductCard from '@/components/ProductCard/ProductCard';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/Common/LoadingSpinner/LoadingSpinner';

// style
import './ListProduct.css';

export interface Props {
  selectedColors: string[];
  selectedPrice: number | null;
  sortType: 'asc' | 'desc' | '';
  selectedSubcategory?: string;
}

const ListProduct: React.FC<Props> = ({ selectedColors, sortType, selectedSubcategory }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(15);
  const { searchValue } = useContext(SearchContext);
  const { onSearchValue } = useContext(SearchContext);

  const { products, isLoading } = useContext(ListProductContext);

  const filteredProducts =
    products?.filter((product) => {
      // Check if the product's color is included in the selected colors
      const isIncludedSelectedColors = selectedColors?.includes(product.color);

      // Check if the product's subcategory matches the selected subcategory
      const isIncludedSelectedSubcategory = selectedSubcategory === product.subcategory;

      // Convert the product name and search value to lowercase for case-insensitive comparison
      const productName = product.name.toLowerCase();
      const searchTerm = searchValue.trim().toLowerCase();

      // Return true if the product name contains the search term and meets the selected colors and subcategory criteria
      return (
        productName.includes(searchTerm) &&
        (!selectedColors.length || isIncludedSelectedColors) &&
        (!selectedSubcategory?.length || isIncludedSelectedSubcategory)
      );
    }) || [];

  /**
   * Sorts the products based on the given sort type.
   * @param {Array<Product>} filteredProducts - The array of filtered products.
   * @param {string} sortType - The sort type (ASC or DESC).
   * @returns {Array<Product>} - The sorted products array.
   */
  const sortedProducts = filteredProducts?.sort((a, b) => {
    // Sort the products based on the sort type
    if (sortType === SORT.ASC) {
      return a.price - b.price;
    }

    if (sortType === SORT.DESC) {
      return b.price - a.price;
    }

    return 0;
  });

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;

  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Get the subset of products for the current page
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages based on the number of products and products per page
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            {searchValue ? ERROR_MESSAGES.NOT_FOUND : ''}
            {searchValue && (
              <button type="button" onClick={() => onSearchValue('')}>
                Try again
              </button>
            )}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListProduct;
