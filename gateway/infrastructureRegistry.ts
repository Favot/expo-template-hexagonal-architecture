import { fetchClient } from './implementation/fetchImplementation';
import { secureStorageClient } from './implementation/asyncStorageImplementation';
import { RestClient } from './services/restClient';
import { StorageClient } from './services/storageClient';

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
