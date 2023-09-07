import { Reducer } from 'react';

// interface
import Product from '@/interface/Product';

// constants
import {
  FETCH_PRODUCTS_CART_REQUEST,
  FETCH_PRODUCTS_CART_SUCCESS,
  FETCH_PRODUCTS_CART_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from '@/constants/actionType';
import ERROR_MESSAGES from '@/constants/errorMsg';

export interface ProductCartState {
  error: string;
  isLoading: boolean;
  isAdding: boolean;
  products: Product[];
}

export type Action =
  | { type: typeof FETCH_PRODUCTS_CART_REQUEST }
  | { type: typeof FETCH_PRODUCTS_CART_SUCCESS; payload: Product[] }
  | { type: typeof FETCH_PRODUCTS_CART_FAILURE }
  | { type: typeof ADD_PRODUCT_REQUEST }
  | { type: typeof ADD_PRODUCT_SUCCESS; payload: Product }
  | { type: typeof ADD_PRODUCT_FAILURE }
  | { type: typeof DELETE_PRODUCT_REQUEST }
  | { type: typeof DELETE_PRODUCT_SUCCESS; payload: string }
  | { type: typeof DELETE_PRODUCT_FAILURE }
  | { type: typeof UPDATE_PRODUCT_REQUEST }
  | { type: typeof UPDATE_PRODUCT_SUCCESS; payload: Partial<Product> }
  | { type: typeof UPDATE_PRODUCT_FAILURE };

const cartReducer: Reducer<ProductCartState, Action> = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_CART_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_PRODUCTS_CART_SUCCESS: {
      const { payload: products } = action;

      return {
        ...state,
        isLoading: false,
        products: products,
      };
    }
    case FETCH_PRODUCTS_CART_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: ERROR_MESSAGES.FETCH_PRODUCTS,
      };
    }
    case ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        isAdding: true,
      };
    }
    case ADD_PRODUCT_SUCCESS: {
      const { payload: newProduct } = action;
      return {
        ...state,
        isAdding: false,
        isLoading: false,
        products: [...state.products, newProduct] as Product[],
      };
    }
    case ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAdding: false,
        error: ERROR_MESSAGES.ADD_FAIL,
      };
    }
    case DELETE_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      const { payload: productId } = action;
      return {
        ...state,
        products: state.products.filter((product) => product.id !== productId),
      };
    }
    case DELETE_PRODUCT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: ERROR_MESSAGES.DELETE_FAIL,
      };
    }
    case UPDATE_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_PRODUCT_SUCCESS: {
      const { payload: updatedProduct } = action;
      const updatedProducts = state.products.map((product) =>
        product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
      );
      return {
        ...state,
        products: updatedProducts,
      };
    }

    case UPDATE_PRODUCT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: ERROR_MESSAGES.UPDATE_FAIL,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
