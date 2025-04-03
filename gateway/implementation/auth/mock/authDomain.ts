import type { Session } from "~/domain";

export const mockSession: Session = {
	tokens: {
		accessToken: "mock-access-token",
		refreshToken: "mock-refresh-token",
		tokenType: "Bearer",
	},
	user: {
		id: "1",
		email: "mock-email",
		firstName: "John",
		lastName: "Doe",
	},
};
