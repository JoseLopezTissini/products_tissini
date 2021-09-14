import { useMemo } from 'react';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  EmptyObject,
  Store,
} from 'redux';
import thunk from 'redux-thunk';

import { cartReducer, CartState } from './cart/cart.reducer';
import { productsReducer, ProductsState } from './products/products.reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});
let store: Store<{
  cart: CartState;
  products: ProductsState;
}>;

function initStore() {
  return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}

export function initializeStore() {
  let _store = store ?? initStore();

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
}

export function useStore() {
  const store = useMemo(() => initializeStore(), []);
  return store;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState> & EmptyObject;
