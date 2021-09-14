import { Product } from '@core/models/products.model';
import { Action } from '@core/types/action.type';
import axios from 'axios';
import { AppDispatch } from '../store';

export type ProductAction = 'SET_PRODUCTS';

export function setProducts(
  products: Product[]
): Action<ProductAction, Product[]> {
  return {
    type: 'SET_PRODUCTS',
    payload: products,
  };
}

export function getProducts() {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get(
      'https://l8.tissini.dev/api/v3/categories/1/products'
    );
    const products = await response.data;
    dispatch(setProducts(products));
  };
}
