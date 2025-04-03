import type { Session } from "../session/session";
import type { LoginCommand, SignUpCommand } from "./authCommand";

export type AuthService = {
	login: (command: LoginCommand) => Promise<Session>;
	logout: () => Promise<void>;
	signUp: (command: SignUpCommand) => Promise<Session>;
};
