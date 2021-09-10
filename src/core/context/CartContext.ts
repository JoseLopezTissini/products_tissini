import React, { createContext } from 'react';
import { CartState } from '../../pages/_app';

interface ContextState {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>
}

export const CartContext = createContext<ContextState>({
  cart: {
    cart: [],
    subtotal: 0
  },
  setCart: () => {}
});
