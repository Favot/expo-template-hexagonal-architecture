import { Session, SessionService } from "~/domain";
import { getInfrastructureRegistry } from "~/gateway/infrastructureRegistry";

const getSession = async (): Promise<Session | null> => {
	const { storageClient } = getInfrastructureRegistry();
	const sessionJson = await storageClient.getItem("session");
	if (!sessionJson) {
		return null;
	}
	try {
		return JSON.parse(sessionJson) as Session;
	} catch (error) {
		console.error("Error parsing session:", error);
		return null;
	}
};

const setSession = async (session: Session | null): Promise<void> => {
	const { storageClient } = getInfrastructureRegistry();
	if (session === null) {
		await storageClient.removeItem("session");
	} else {
		await storageClient.setItem("session", JSON.stringify(session));
	}
};

const removeSession = async (): Promise<void> => {
	const { storageClient } = getInfrastructureRegistry();
	await storageClient.removeItem("session");
};

export const sessionServiceStorageImplementation: SessionService = {
	getSession,
	setSession,
	removeSession,
};
