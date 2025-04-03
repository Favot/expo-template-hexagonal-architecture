export type User = {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
	displayName?: string;
	avatarUrl?: string;
	roles?: string[];
	permissions?: string[];
};
