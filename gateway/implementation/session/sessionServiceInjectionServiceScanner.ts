import type { Session } from "~/domain";
import type { SessionService } from "~/domain/session/sessionService";
import { mockImplemSwitcher } from "~/gateway/implementationScannerUtils";
import { sessionServiceInMemoryImplementation } from "./sessionServiceInMemoryImplementation";
import { sessionServiceStorageImplementation } from "./sessionServiceStorageImplementation";

const getSession = async (): Promise<Session | null> => {
	const implem = await mockImplemSwitcher({
		mockFF: "FF_SESSION_MOCK",
		realImplem: sessionServiceStorageImplementation.getSession,
		mockImplem: sessionServiceInMemoryImplementation.getSession,
	});
	return implem();
};

const setSession = async (session: Session | null): Promise<void> => {
	const implem = await mockImplemSwitcher({
		mockFF: "FF_SESSION_MOCK",
		realImplem: sessionServiceStorageImplementation.setSession,
		mockImplem: sessionServiceInMemoryImplementation.setSession,
	});
	return implem(session);
};

const removeSession = async (): Promise<void> => {
	const implem = await mockImplemSwitcher({
		mockFF: "FF_SESSION_MOCK",
		realImplem: sessionServiceStorageImplementation.removeSession,
		mockImplem: sessionServiceInMemoryImplementation.removeSession,
	});
	return implem();
};

export const sessionImplementation: SessionService = {
	getSession,
	setSession,
	removeSession,
};
