import { CartItem, Product, ProductPrice } from '@core/models/products.model';
import { getDiscount } from '@core/utils/getDiscount';
import { Action } from '@core/types/action.type';

import { setPrices } from '../products/products.action';
import { AppDispatch, RootState } from '../store';

export type CartAction = 'UPDATE_CART';

export function addProduct(product: Product) {
  return (dispatch: AppDispatch, getState: any) => {
    const { cart, products }: RootState = getState();
    const currentProduct = cart.products.find(
      ({ variant }) => variant.id === product.variants[0].id
    );

    const restCart = currentProduct
      ? cart.products.filter(
          ({ variant }) => variant.id !== product.variants[0].id
        )
      : cart.products;

    const _cart: CartItem[] = [
      ...restCart,
      {
        price: +product.variants[0].price,
        product: product,
        quantity: currentProduct ? currentProduct.quantity + 1 : 1,
        variant: product.variants[0],
      },
    ];

    const _subtotal = _cart.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );

    const prices: ProductPrice[] = products.products.map((_product) => {
      const _prices = _product.variants.map((variant) => +variant.price);
      const minPrice = _prices.length ? Math.min(..._prices) : 0;
      const maxPrice = _prices.length ? Math.max(..._prices) : 0;

      const discount = getDiscount(_product.category.name, _subtotal);
      const newMin = (minPrice * (1 - discount)).toFixed(2);
      const newMax = (maxPrice * (1 - discount)).toFixed(2);
      return {
        price: newMin === newMax ? `${newMax}` : `${newMin} - ${newMax}`,
        productid: _product.id,
      };
    });

    dispatch(updateCart(_cart, _subtotal));
    dispatch(setPrices(prices));
  };
}

export function updateCart(
  products: CartItem[],
  subtotal: number
): Action<CartAction> {
  return {
    type: 'UPDATE_CART',
    payload: {
      products,
      subtotal,
    },
  };
}
