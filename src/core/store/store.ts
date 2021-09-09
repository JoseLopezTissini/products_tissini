import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootStore = combineReducers({
});

export const store = createStore(
  rootStore,
  composeEnhancers(applyMiddleware(thunk))
);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
