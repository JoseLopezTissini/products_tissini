import { Product, ProductPrice } from '@core/models/products.model';
import { Action } from '@core/types/action.type';
import axios from 'axios';
import { AppDispatch } from '../store';

export type ProductAction = 'SET_PRODUCTS' | 'SET_PRICES';

export function setProducts(
  products: Product[]
): Action<ProductAction, Product[]> {
  return {
    type: 'SET_PRODUCTS',
    payload: products,
  };
}

export function setPrices(
  prices: ProductPrice[]
): Action<ProductAction, ProductPrice[]> {
  return {
    payload: prices,
    type: 'SET_PRICES',
  };
}

export function getProducts() {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get(
      'https://l8.tissini.dev/api/v3/categories/1/products'
    );
    const products: Product[] = await response.data;
    const productsPrices: ProductPrice[] = products.map((product) => ({
      productid: product.id,
      price: product.variants[0] ? +product.variants[0].price : 0,
    }));
    dispatch(setProducts(products));
    dispatch(setPrices(productsPrices));
  };
}
