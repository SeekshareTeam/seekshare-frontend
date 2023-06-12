export interface Set {
  [key: string]: 1;
}

export function isKeyOfObject<T extends object>(
  key: string | number | symbol,
  obj: T
): key is keyof T {
  return key in obj;
}

export interface SavedComponent<T> {
  id: string;
  code: string;
  type: T;
  // TODO: add events
}

export interface SavedComponents<T> {
  [key: string]: SavedComponent<T>;
}
