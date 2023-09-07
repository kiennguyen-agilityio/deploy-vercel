import axios from 'axios';
import {
  getProducts,
  getProductById,
  getCartProducts,
  addToCart,
  updateItem,
  deleteCartItem,
} from '../api-action';
import { PRODUCTS_API, CART_API } from '@/constants/api';

jest.mock('axios');

const axiosGetSpy = jest.spyOn(axios, 'get');
const axiosPostSpy = jest.spyOn(axios, 'post');
const axiosDeleteSpy = jest.spyOn(axios, 'delete');
const axiosPutSpy = jest.spyOn(axios, 'put');

const MOCK_PRODUCT_DATA = {
  id: '1',
  name: 'Fullset Black Chair & Sofa',
  sale: '360',
  price: 5000,
  discountPercent: 10,
  image: '../src/assets/images/full-black-chair-sofa.png',
  descriptions:
    'black sofa fullset, made of leather selection from the Himalayan mountains. Knitted by the professional hands of housewives. Making a masterpiece of the best sofa in the world. Very soft and comfortable',
  quantity: 2,
  color: 'Red',
  subcategory: 'Office chair',
};

describe('getProducts', () => {
  it('should return product data on successful API call', async () => {
    const mockResponse = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    axiosGetSpy.mockResolvedValueOnce({ data: mockResponse });
    const result = await getProducts();

    expect(result).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalledWith(PRODUCTS_API, {
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should throw an error on API call failure', async () => {
    const mockError = new Error('API error');
    axiosGetSpy.mockRejectedValueOnce(mockError);

    await expect(getProducts()).rejects.toThrow('API error');
    expect(axios.get).toHaveBeenCalledWith(PRODUCTS_API, {
      headers: { 'content-type': 'application/json' },
    });
  });
});

describe('getProductById', () => {
  it('should return product data on successful API call', async () => {
    const mockResponse = { id: '1', name: 'Product 1' };
    axiosGetSpy.mockResolvedValueOnce({ data: mockResponse });
    const result = await getProductById('1');

    expect(result).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalledWith(`${PRODUCTS_API}/1`, {
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should throw an error on API call failure', async () => {
    const mockError = new Error('API error');
    axiosGetSpy.mockRejectedValueOnce(mockError);

    await expect(getProductById('1')).rejects.toThrow('API error');
    expect(axios.get).toHaveBeenCalledWith(`${PRODUCTS_API}/1`, {
      headers: { 'content-type': 'application/json' },
    });
  });
});

describe('getCartProducts', () => {
  it('should return cart products on successful API call', async () => {
    const mockResponse = [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ];
    axiosGetSpy.mockResolvedValueOnce({ data: mockResponse });
    const result = await getCartProducts();

    expect(result).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalledWith(CART_API, {
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should throw an error on API call failure', async () => {
    const mockError = new Error('API error');
    axiosGetSpy.mockRejectedValueOnce(mockError);

    await expect(getCartProducts()).rejects.toThrow('API error');
    expect(axios.get).toHaveBeenCalledWith(CART_API, {
      headers: { 'content-type': 'application/json' },
    });
  });
});

describe('addToCart', () => {
  it('should add a product to the cart on successful API call', async () => {
    const mockProduct = {
      id: '1',
      name: 'Fullset Black Chair & Sofa',
      sale: '360',
      price: 5000,
      discountPercent: 10,
      image: '../src/assets/images/full-black-chair-sofa.png',
      descriptions:
        'black sofa fullset, made of leather selection from the Himalayan mountains. Knitted by the professional hands of housewives. Making a masterpiece of the best sofa in the world. Very soft and comfortable',
      quantity: 2,
      color: 'Red',
      subcategory: 'Office chair',
    };
    axiosPostSpy.mockResolvedValueOnce({ data: mockProduct });

    const result = await addToCart(MOCK_PRODUCT_DATA);

    expect(result).toEqual(mockProduct);
    expect(axios.post).toHaveBeenCalledWith(CART_API, mockProduct, {
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should throw an error on API call failure', async () => {
    const mockError = new Error('API error');
    axiosPostSpy.mockRejectedValueOnce(mockError);

    await expect(addToCart(MOCK_PRODUCT_DATA)).rejects.toThrow('API error');
    expect(axios.post).toHaveBeenCalledWith(CART_API, MOCK_PRODUCT_DATA, {
      headers: { 'content-type': 'application/json' },
    });
  });
});

describe('updateItem', () => {
  it('should update a product item on successful API call', async () => {
    const mockId = '1';
    const mockUpdatedData = { name: 'Updated Product' };
    const mockUrl = 'https://product.com/api/products';
    axiosPutSpy.mockResolvedValueOnce({ data: mockUpdatedData });

    const result = await updateItem(mockId, mockUpdatedData, mockUrl);

    expect(result).toEqual(mockUpdatedData);
    expect(axios.put).toHaveBeenCalledWith(`${mockUrl}/${mockId}`, mockUpdatedData, {
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should throw an error on API call failure', async () => {
    const mockId = '1';
    const mockUpdatedData = { name: 'Updated Product' };
    const mockUrl = 'https://product.com/api/products';
    const mockError = new Error('API error');
    axiosPutSpy.mockRejectedValueOnce(mockError);

    await expect(updateItem(mockId, mockUpdatedData, mockUrl)).rejects.toThrow('API error');
    expect(axios.put).toHaveBeenCalledWith(`${mockUrl}/${mockId}`, mockUpdatedData, {
      headers: { 'content-type': 'application/json' },
    });
  });
});

describe('deleteCartItem', () => {
  it('should delete a cart item on successful API call', async () => {
    const mockId = '1';

    const mockResponseData = { id: '1' };
    axiosDeleteSpy.mockResolvedValueOnce({ data: mockResponseData });

    const result = await deleteCartItem(mockId);

    expect(result).toEqual(mockResponseData);
    expect(axios.delete).toHaveBeenCalledWith(`${CART_API}/${mockId}`, {
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should throw an error on API call failure', async () => {
    const mockId = '1';
    const mockError = new Error('API error');
    axiosDeleteSpy.mockRejectedValueOnce(mockError);

    await expect(deleteCartItem(mockId)).rejects.toThrow('API error');
    expect(axios.delete).toHaveBeenCalledWith(`${CART_API}/${mockId}`, {
      headers: { 'content-type': 'application/json' },
    });
  });
});
