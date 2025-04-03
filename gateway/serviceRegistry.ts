import type { AuthService, SessionService } from "~/domain";
import { authServiceImplementation } from "./implementation/auth/authServiceInjectionServiceScanner";
import { sessionImplementation } from "./implementation/session/sessionServiceInjectionServiceScanner";

export type ServiceRegistry = {
	sessionService: SessionService;
	authService: AuthService;
};

export const useServiceRegistry = (): ServiceRegistry => {
	return {
		sessionService: sessionImplementation,
		authService: authServiceImplementation,
	};
};
