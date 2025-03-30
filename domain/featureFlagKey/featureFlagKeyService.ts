import { FeatureFlagKey } from "./featureFlagKey";

export type FeatureFlippingService = {
  isFeatureFlagActivated(featureFlagKey: FeatureFlagKey): Promise<boolean>;
};
