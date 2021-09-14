import { CartItem, Product } from '@core/models/products.model';
import { Action } from '@core/types/action.type';
import { getDiscount } from '@core/utils/getDiscount';
import { setProducts } from '../products/products.action';
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
      
    const newCart: CartItem[] = [
      ...restCart,
      {
        price: +product.variants[0].price,
        product: product,
        quantity: 1,
        variant: product.variants[0],
      },
    ];

    const newSubtotal = newCart.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );

    const newProducts = products.products.map((mappingProduct) => {
      const prices = mappingProduct.variants.map((variant) => +variant.price);
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 0;

      const discount = getDiscount(mappingProduct.category.name, newSubtotal);
      const newMin = (minPrice * (1 - discount)).toFixed(2);
      const newMax = (maxPrice * (1 - discount)).toFixed(2);
      return {
        ...mappingProduct,
        price: newMin === newMax ? `${newMax}` : `${newMin} - ${newMax}`,
      };
    });

    dispatch(updateCart(newCart, newSubtotal));
    dispatch(setProducts(newProducts));
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
