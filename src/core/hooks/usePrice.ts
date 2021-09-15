import { useSelector } from 'react-redux';

import { ProductPrice } from '@core/models/products.model';
import { RootState } from '@core/store/store';

export function usePrice(productId: number): ProductPrice | undefined {
  const productPrice = useSelector((state: RootState) =>
    state.products.prices.find((price) => price.productid === productId)
  );
  return productPrice;
}
