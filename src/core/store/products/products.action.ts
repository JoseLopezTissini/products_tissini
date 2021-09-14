import { Product } from '@core/models/products.model';
import { Action } from '@core/types/action.type';

export type ProductAction = 'SET_PRODUCTS';

export function setProducts(
  products: Product[]
): Action<ProductAction, Product[]> {
  return {
    type: 'SET_PRODUCTS',
    payload: products,
  };
}
