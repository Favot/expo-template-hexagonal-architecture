import type { Session, SessionService } from "~/domain";

const getSession = async (): Promise<Session | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const session: Session = {
				tokens: {
					accessToken: "token",
					tokenType: "Bearer",
				},
				user: {
					id: "1",
					email: "email",
					firstName: "firstName",
					lastName: "lastName",
					displayName: "displayName",
					avatarUrl: "avatarUrl",
					roles: ["role1", "role2"],
					permissions: ["permission1", "permission2"],
				},
			};

			resolve(session);
		}, 500);
	});
};

const setSession = async (session: Session | null): Promise<Session | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(session);
		}, 500);
	});
};

const removeSession = async (): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 500);
	});
};

export const sessionServiceInMemoryImplementation: SessionService = {
	getSession,
	setSession,
	removeSession,
};
