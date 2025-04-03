import type { AuthService, Session } from "~/domain";

const login = (): Promise<Session> => {
	throw new Error("Not implemented");
};

const logout = (): Promise<void> => {
	throw new Error("Not implemented");
};

const signUp = (): Promise<Session> => {
	throw new Error("Not implemented");
};

export const authRestImplementation: AuthService = {
	login,
	logout,
	signUp,
};
