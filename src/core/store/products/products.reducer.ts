import { Product } from '@core/models/products.model';
import { Action } from '@core/types/action.type';
import { ProductAction } from './products.action';

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export function productsReducer(
  state = initialState,
  action: Action<ProductAction>
): ProductsState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
