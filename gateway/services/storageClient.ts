export type StorageKey =
  | 'auth.token'
  | 'user.preferences'
  | 'app.settings'
  | 'app.theme'
  | 'app.language'
  | 'session';

export type StorageClient = {
  getItem: (key: StorageKey) => Promise<string | null>;
  setItem: (key: StorageKey, value: string) => Promise<void>;
  removeItem: (key: StorageKey) => Promise<void>;
  clear: () => Promise<void>;
};
