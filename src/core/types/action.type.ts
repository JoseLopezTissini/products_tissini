export type Action<T, E = any> = {
  type: T;
  payload: E;
};
