import { Product } from '@core/models/products.model';
import { Action } from '@core/types/action.type';

export type CartAction = 'ADD_PRODUCT';

export function addProduct(product: Product): Action<CartAction, Product> {
  return {
    type: 'ADD_PRODUCT',
    payload: product,
  };
}
