import type { FeatureFlippingService } from "~/domain";
import { ffServiceEnvVarImplementation } from "./implementation/featureFlagKey/featureFlagService";

type FeatureFlippingRegistry = {
	featureFlippingService: FeatureFlippingService;
};

export const getFeatureFlippingRegistry = (): FeatureFlippingRegistry => {
	return {
		featureFlippingService: ffServiceEnvVarImplementation,
	};
};
