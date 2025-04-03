export type LoginCommand = {
	email: string;
	password: string;
};

export type SignUpCommand = {
	email: string;
	password: string;
	passwordConfirmation: string;
};
