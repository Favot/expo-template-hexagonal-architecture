import { secureStorageClient } from "./implementation/asyncStorageImplementation";
import { fetchClient } from "./implementation/fetchImplementation";
import type { RestClient } from "./services/restClient";
import type { StorageClient } from "./services/storageClient";

type InfrastructureRegistry = {
	restClient: RestClient;
	storageClient: StorageClient;
};

export const getInfrastructureRegistry = (): InfrastructureRegistry => {
	return {
		restClient: fetchClient,
		storageClient: secureStorageClient,
	};
};
