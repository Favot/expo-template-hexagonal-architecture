import { SessionService } from "~/domain";
import { sessionImplementation } from "./implementation/session/sessionServiceInjectionServiceScanner";

export type ServiceRegistry = {
  sessionService: SessionService;
};

export const useServiceRegistry = (): ServiceRegistry => {
  return {
    sessionService: sessionImplementation,
  };
};
