import type { Session } from "./session";

export type SessionService = {
	getSession: () => Promise<Session | null>;
	setSession: (session: Session | null) => Promise<Session | null>;
	removeSession: () => Promise<void>;
};
