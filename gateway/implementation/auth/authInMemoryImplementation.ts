import type {
	AuthService,
	LoginCommand,
	Session,
	SignUpCommand,
} from "~/domain";
import { mockSession } from "./mock/authDomain";

const login = (command: LoginCommand): Promise<Session> => {
	const loginSession = {
		...mockSession,
		user: {
			...mockSession.user,
			email: command.email,
			id: "mock-user-id",
		},
	};

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(loginSession);
		}, 1000);
	});
};

const logout = (): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 1000);
	});
};

const signUp = (command: SignUpCommand): Promise<Session> => {
	const signUpSession = {
		...mockSession,
		user: {
			...mockSession.user,
			email: command.email,
			id: "mock-user-id",
		},
	};
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(signUpSession);
		}, 1000);
	});
};

export const authInMemoryImplementation: AuthService = {
	login,
	logout,
	signUp,
};
