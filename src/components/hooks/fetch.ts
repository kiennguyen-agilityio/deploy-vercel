import useSWR from 'swr';

// services
import { getProducts, getCartProducts, getProductById } from '@/services/api-action';

// constants
import { PRODUCTS_API, CART_API } from '@/constants/api';

// interfaces
import Product from '@/interface/Product';

interface ProductState {
  isLoading: boolean;
  error?: Error;
  data?: Product[];
}

interface ProductStateById {
  isLoading: boolean;
  error?: Error;
  data?: Product;
}

/**
 * Custom hook to fetch and manage products data.
 *
 * @returns {ProductState} The products data, loading state, and error state.
 */
export const useProducts = (): ProductState => {
  // Fetch products data using SWR hook
  const { data, error, isLoading } = useSWR(PRODUCTS_API, getProducts);

  // Return the products data, loading state, and error state
  return {
    data,
    isLoading,
    error,
  };
};

/**
 * Custom hook to fetch product data by id.
 *
 * @param productId - The id of the product to fetch.
 * @returns An object containing the product data, loading state, and error.
 */
export const useProductById = (productId: string): ProductStateById => {
  const { data, error, isLoading } = useSWR<Product>(`${productId}`, getProductById);

  return {
    data,
    isLoading,
    error,
  };
};
/**
 * Fetches the cart products from the API and returns the data, loading state, and error.
 * @returns An object containing the cart product data, loading state, and error.
 */
export const useCartProducts = (): ProductState => {
  // Fetch the cart products using the useSWR hook
  const { data, error, isLoading } = useSWR(CART_API, getCartProducts);

  // Return the cart product data, loading state, and error
  return {
    data,
    isLoading,
    error,
  };
};
