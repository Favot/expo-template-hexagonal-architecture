import { Session } from './session';

export type SessionService = {
  getSession: () => Promise<Session | null>;
  setSession: (session: Session | null) => Promise<void>;
  removeSession: () => Promise<void>;
};
