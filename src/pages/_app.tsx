import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PageWithLayout } from '../core/types/layout.type';
import { CartItem } from '../core/models/products.model';
import { Provider } from 'react-redux';
import { useStore } from '@core/store/store';

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

export interface CartState {
  cart: CartItem[];
  subtotal: number;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  /* const [cart, setCart] = useState<CartState>({ cart: [], subtotal: 0 }); */

  const store = useStore();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
export default MyApp;
