export type FlattenReturn<T = void> = readonly [Error, undefined] | readonly [null, T];
