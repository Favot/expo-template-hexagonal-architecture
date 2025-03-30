import { FeatureFlagKey } from "~/domain";

const strToBoolean = (value: string | undefined): boolean =>
  value?.toLowerCase() === "true";

export const BOOLEAN_FEATURE_FLAG_MAP: Record<FeatureFlagKey, boolean> = {
  FF_ALWAYS_FALSE: strToBoolean(process.env.EXPO_PUBLIC_FF_ALWAYS_FALSE),
  FF_ALWAYS_TRUE: strToBoolean(process.env.EXPO_PUBLIC_FF_ALWAYS_TRUE),
  FF_SESSION_MOCK: strToBoolean(process.env.EXPO_PUBLIC_FF_SESSION_MOCK),
};
