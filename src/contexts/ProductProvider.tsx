import { createContext, ReactNode, useState, useMemo } from 'react';

// hooks
import { useProducts } from '@/components/hooks/fetch';

// interfaces
import Product from '@/interface/Product';

interface ProductProviderProps {
  children: ReactNode;
}

export interface ListProductContextProps {
  products?: Product[];
  selectedProduct?: Product | null;
  onGetProductById: (productId: string) => void;
  error: string;
  isLoading: boolean;
}

export const ListProductContext = createContext<ListProductContextProps>({
  onGetProductById: async () => {},
  error: '',
  isLoading: false,
});

export const ListProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const { data: productsFromSwr, error: productsError, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getProductById = (productId: string) => {
    const selectedProduct = productsFromSwr?.find((product) => product.id === productId);
    setSelectedProduct(selectedProduct || null);
  };

  const productContextValue = useMemo(
    () => ({
      products: productsFromSwr,
      selectedProduct,
      onGetProductById: getProductById,
      error: productsError ? productsError.message : '',
      isLoading,
    }),
    [productsError, productsFromSwr, selectedProduct]
  );

  return (
    <ListProductContext.Provider value={productContextValue}>
      {children}
    </ListProductContext.Provider>
  );
};
