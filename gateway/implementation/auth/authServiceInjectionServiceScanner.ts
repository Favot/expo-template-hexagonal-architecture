import type { AuthService, LoginCommand, SignUpCommand } from "~/domain";
import { mockImplemSwitcher } from "~/gateway/implementationScannerUtils";
import { authInMemoryImplementation } from "./authInMemoryImplementation";
import { authRestImplementation } from "./authRestImplementation";

const login = async (command: LoginCommand) => {
	const implem = await mockImplemSwitcher({
		mockFF: "FF_AUTH_MOCK",
		realImplem: authRestImplementation.login,
		mockImplem: authInMemoryImplementation.login,
	});
	return implem(command);
};

const logout = async () => {
	const implem = await mockImplemSwitcher({
		mockFF: "FF_AUTH_MOCK",
		realImplem: authRestImplementation.logout,
		mockImplem: authInMemoryImplementation.logout,
	});
	return implem();
};

const signUp = async (command: SignUpCommand) => {
	const implem = await mockImplemSwitcher({
		mockFF: "FF_AUTH_MOCK",
		realImplem: authRestImplementation.signUp,
		mockImplem: authInMemoryImplementation.signUp,
	});
	return implem(command);
};

export const authServiceImplementation: AuthService = {
	login,
	logout,
	signUp,
};
