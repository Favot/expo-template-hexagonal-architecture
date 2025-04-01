import type { FeatureFlagKey } from "~/domain";
import { getFeatureFlippingRegistry } from "./featureFlippingRegistry";

export async function mockImplemSwitcher<T>({
	mockFF,
	mockImplem,
	realImplem,
}: {
	mockFF: FeatureFlagKey;
	realImplem: T;
	mockImplem: T;
}): Promise<T> {
	const { featureFlippingService } = getFeatureFlippingRegistry();

	const shouldUseMock =
		await featureFlippingService.isFeatureFlagActivated(mockFF);
	return shouldUseMock ? mockImplem : realImplem;
}
