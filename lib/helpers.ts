export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Partialize<T> = Prettify<
  PartializeUndefined<T> & Omit<T, keyof PartializeUndefined<T>>
>;

type PartializeUndefined<T> = {
  [P in keyof T as IfUndefined<T[P], P>]?: T[P];
};

type IfUndefined<T, P> = T extends undefined ? P : never;

export type ReverseMap<T> = {
  [P in keyof T as T[P] extends number | string | symbol ? T[P] : never]: P;
};

export type PossiblePromise<T> = T | Promise<T>;

export function wrapArrayIfNeeded<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
