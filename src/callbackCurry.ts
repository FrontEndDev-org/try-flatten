export type Callback<T> = (err: null | undefined | Error, res: T) => any;

export type CallbackFunction0<T> = (callback: Callback<T>) => any;
export type CallbackFunction1<A, T> = (a: A, callback: Callback<T>) => any;
export type CallbackFunction2<A, B, T> = (a: A, b: B, callback: Callback<T>) => any;
export type CallbackFunction3<A, B, C, T> = (a: A, b: B, c: C, callback: Callback<T>) => any;
export type CallbackFunction4<A, B, C, D, T> = (a: A, b: B, c: C, d: D, callback: Callback<T>) => any;
export type CallbackFunction5<A, B, C, D, E, T> = (a: A, b: B, c: C, d: D, e: E, callback: Callback<T>) => any;
export type CallbackFunction6<A, B, C, D, E, F, T> = (a: A, b: B, c: C, d: D, e: E, f: F, callback: Callback<T>) => any;

export type CallbackCurried<T> = (callback: Callback<T>) => any;

export function callbackCurry<T>(cf: CallbackFunction0<T>): CallbackCurried<T>;
export function callbackCurry<A, T>(cf: CallbackFunction1<A, T>, a: A): CallbackCurried<T>;
export function callbackCurry<A, B, T>(cf: CallbackFunction2<A, B, T>, a: A, b: B): CallbackCurried<T>;
export function callbackCurry<A, B, C, T>(cf: CallbackFunction3<A, B, C, T>, a: A, b: B, c: C): CallbackCurried<T>;
export function callbackCurry<A, B, C, D, T>(
  cf: CallbackFunction4<A, B, C, D, T>,
  a: A,
  b: B,
  c: C,
  d: D
): CallbackCurried<T>;
export function callbackCurry<A, B, C, D, E, T>(
  cf: CallbackFunction5<A, B, C, D, E, T>,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E
): CallbackCurried<T>;
export function callbackCurry<A, B, C, D, E, F, T>(
  cf: CallbackFunction6<A, B, C, D, E, F, T>,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F
): CallbackCurried<T>;
export function callbackCurry(cf: any, ...args: any[]): CallbackCurried<any> {
  return function callbackCurried(callback: Callback<any>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cf.apply(this, [...args, callback]);
  };
}
