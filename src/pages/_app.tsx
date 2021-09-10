import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PageWithLayout } from '../core/types/layout.type';

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
export default MyApp;
