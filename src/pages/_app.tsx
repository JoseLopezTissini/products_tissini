import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PageWithLayout } from '../core/types/layout.type';
import { CartContext } from '../core/context/CartContext';
import { CartItem } from '../core/models/products.model';
import { useState } from 'react';

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

export interface CartState {
  cart: CartItem[];
  subtotal: number;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [cart, setCart] = useState<CartState>({ cart: [], subtotal: 0 });
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {getLayout(<Component {...pageProps} />)}
    </CartContext.Provider>
  );
}
export default MyApp;
