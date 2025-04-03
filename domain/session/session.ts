import type { User } from "../user/user";

export type TokenType = "Bearer" | "Basic";

export type AuthTokens = {
	accessToken: string;
	refreshToken?: string;
	tokenType: TokenType;
	expiresIn?: number;
	expiresAt?: Date;
};

export interface Session {
	tokens?: AuthTokens;
	user?: User;
	error?: {
		code: string;
		message: string;
	};
}
