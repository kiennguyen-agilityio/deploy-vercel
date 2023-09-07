import { createContext, useMemo, useCallback, ReactNode, useReducer, useContext } from 'react';
import { mutate } from 'swr';

// constants
import {
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from '@/constants/actionType';

// services
import { addToCart, deleteCartItem, updateItem } from '@/services/api-action';

// hooks
import { useCartProducts } from '@/components/hooks/fetch';

// constants
import { CART_API } from '@/constants/api';

// reducers
import cartReducer, { ProductCartState } from '@/reducers/cartReducer';

// interfaces
import Product from '@/interface/Product';

export const initialState: ProductCartState = {
  error: '',
  isLoading: false,
  isAdding: false,
  products: [],
};

export interface CartContextProps {
  error: string;
  isAdding: boolean;
  isLoading: boolean;
  products?: Product[];
  onAddToCart: (product: Product) => void;
  onUpdateCart: (productId: string, updatedData: Partial<Product>, url: string) => Promise<void>;
  onDeleteProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextProps>({
  error: '',
  isAdding: false,
  isLoading: false,
  products: [],
  onAddToCart: () => undefined,
  onUpdateCart: async () => {},
  onDeleteProductFromCart: async () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const useProductCartContext = () => useContext(CartContext);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isLoading, error, isAdding } = state;
  const { data: productsFromSwr } = useCartProducts();

  const handleAddToCart = useCallback(async (product: Product): Promise<void> => {
    try {
      dispatch({ type: ADD_PRODUCT_REQUEST });

      const data = await addToCart(product);

      mutate(CART_API);

      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
    } catch {
      dispatch({ type: ADD_PRODUCT_FAILURE });
    }
  }, []);

  const handleDeleteProductFromCart = useCallback(async (productId: string): Promise<void> => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });

      await deleteCartItem(productId);

      mutate(CART_API);

      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAILURE });
    }
  }, []);

  const handleUpdateItem = useCallback(
    async (productId: string, updatedData: Partial<Product>, url: string) => {
      try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        await updateItem(productId, updatedData, url);

        mutate(CART_API);

        const updatedProductData: Partial<Product> = {
          ...updatedData,
          id: productId,
        };

        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: updatedProductData });
      } catch {
        dispatch({ type: UPDATE_PRODUCT_FAILURE });
      }
    },
    []
  );

  const cartContextValue = useMemo(
    () => ({
      isLoading,
      error,
      products: productsFromSwr || [],
      isAdding,
      onAddToCart: handleAddToCart,
      onUpdateCart: handleUpdateItem,
      onDeleteProductFromCart: handleDeleteProductFromCart,
    }),
    [state, productsFromSwr]
  );

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
