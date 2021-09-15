import { Product, ProductPrice } from '@core/models/products.model';
import { Action } from '@core/types/action.type';
import { ProductAction } from './products.action';

export interface ProductsState {
  products: Product[];
  prices: ProductPrice[];
}

const initialState: ProductsState = {
  products: [],
  prices: [],
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
    case 'SET_PRICES':
      return {
        ...state,
        prices: action.payload,
      };
    default:
      return state;
  }
}
