import axios from 'axios';

// constants
import { CART_API, PRODUCTS_API } from '@/constants/api';

// helpers
import { ShowErrors } from '@/helper/showErrorsMessage';

// interfaces
import Product from '@/interface/Product';

/**
 * Retrieves all products from the API.
 * @returns {Promise<Product[]>} - An array of products.
 * @throws {Error} - If there's an error retrieving the products.
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(PRODUCTS_API, {
      headers: { 'content-type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

/**
 * Retrieves a product by its ID from the API.
 * @param {string} id - The ID of the product.
 * @returns {Promise<Product | null>} - The product with the specified ID, or null if not found.
 * @throws {Error} - If there's an error retrieving the product.
 */
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${PRODUCTS_API}/${id}`, {
      headers: { 'content-type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

/**
 * Retrieves all products in the cart from the API.
 * @returns {Promise<Product[]>} - An array of products in the cart.
 * @throws {Error} - If there's an error retrieving the cart products.
 */
export const getCartProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(CART_API, {
      headers: { 'content-type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

/**
 * Adds a product to the cart.
 * @param {Product} product - The product to add to the cart.
 * @returns {Promise<Product>} - The response from the API.
 * @throws {Error} - If there's an error adding the product to the cart.
 */
export const addToCart = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.post(CART_API, product, {
      headers: { 'content-type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

/**
 * Updates an item in the cart.
 * @param {string} id - The ID of the item to update.
 * @param {Partial<Product>} updatedData - The updated data for the item.
 * @param {string} url - The URL of the API endpoint.
 * @returns {Promise<Product>} - The response from the API.
 * @throws {Error} - If there's an error updating the item.
 */
export const updateItem = async (
  id: string,
  updatedData: Partial<Product>,
  url: string
): Promise<Product> => {
  try {
    const urlUpdateItem = `${url}/${id}`;
    const response = await axios.put(urlUpdateItem, updatedData, {
      headers: { 'content-type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

/**
 * Deletes an item from the cart.
 * @param {string} id - The ID of the item to delete.
 * @returns {Promise<Product>} - The response from the API.
 * @throws {Error} - If there's an error deleting the item.
 * */
export const deleteCartItem = async (id: string): Promise<Product> => {
  try {
    const url = `${CART_API}/${id}`;
    const response = await axios.delete(url, {
      headers: { 'content-type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};
