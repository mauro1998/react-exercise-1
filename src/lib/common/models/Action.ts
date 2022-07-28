export interface Action<T = any, P = any> {
  type: T;
  payload?: P;
}
