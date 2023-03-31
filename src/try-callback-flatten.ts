import { normalizeError } from './normalize-error';

export type Callback<T> = (err: null | undefined | Error, res: T) => any;
export type CallbackFunction<T> = (callback: Callback<T>) => any;

export function tryCallbackFlatten<T>(
  callbackFunction: CallbackFunction<T>
): Promise<readonly [Error, undefined] | readonly [null, T]> {
  return new Promise((resolve) => {
    callbackFunction((err, res) => {
      if (err) {
        resolve([normalizeError(err), undefined] as const);
      } else {
        resolve([null, res] as const);
      }
    });
  });
}
