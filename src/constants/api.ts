export const URL_API = {
  BASE_URL: process.env.VITE_BASE_URL,
  PRODUCTS_URL: '/products',
  CART_URL: '/cart',
};

const PRODUCTS_API = `${URL_API.BASE_URL}${URL_API.PRODUCTS_URL}`;
const CART_API = `${URL_API.BASE_URL}${URL_API.CART_URL}`;

export { PRODUCTS_API, CART_API };
