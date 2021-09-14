import { CartItem } from '@core/models/products.model';
import { Action } from '@core/types/action.type';
import { CartAction } from './cart.action';

export interface CartState {
  products: CartItem[];
  subtotal: number;
}

const initialState: CartState = {
  products: [],
  subtotal: 0,
};

export function cartReducer(
  state = initialState,
  action: Action<CartAction>
): CartState {
  switch (action.type) {
    case 'UPDATE_CART':
      return {
        ...state,
        products: [...action.payload.products],
        subtotal: action.payload.subtotal,
      };
    default:
      return state;
  }
}
