const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

type AppConfigKey =
	| "APP_BUNDLE_ID"
	| "APP_NAME"
	| "APP_SLUG"
	| "APP_VERSION"
	| "APP_PACKAGE_NAME"
	| "APP_SCHEME";
const getAppConfig = (
	key: AppConfigKey,
	options: {
		devSuffix?: string;
		previewSuffix?: string;
	} = {},
) => {
	const { devSuffix = ".dev", previewSuffix = ".preview" } = options;

	if (IS_DEV) {
		return `${process.env[key]}${devSuffix}`;
	}

	if (IS_PREVIEW && previewSuffix) {
		return `${process.env[key]}${previewSuffix}`;
	}

	return `${process.env[key]}`;
};

// Use the generic function for each specific case
export const getAppBundleId = () => getAppConfig("APP_BUNDLE_ID");
export const getAppName = () =>
	getAppConfig("APP_NAME", {
		devSuffix: " (Dev)",
		previewSuffix: " (Preview)",
	});
export const getAppSlug = () => getAppConfig("APP_SLUG", { previewSuffix: "" });
export const getAppVersion = () => getAppConfig("APP_VERSION");
export const getAppPackageName = () =>
	getAppConfig("APP_PACKAGE_NAME", { previewSuffix: "" });

export const getAppScheme = () =>
	getAppConfig("APP_SCHEME", { previewSuffix: "" });

export default {
	name: getAppName(),
	slug: getAppSlug(),
	version: getAppVersion(),
	orientation: "portrait",
	icon: "./assets/images/icon.png",
	scheme: getAppScheme(),
	userInterfaceStyle: "automatic",
	newArchEnabled: true,
	splash: {
		image: "./assets/images/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		supportsTablet: true,
		bundleIdentifier: getAppBundleId(),
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/images/adaptive-icon.png",
			backgroundColor: "#ffffff",
		},
		package: getAppPackageName(),
	},
	web: {
		bundler: "metro",
		output: "static",
		favicon: "./assets/images/favicon.png",
	},
	plugins: ["expo-router", "expo-localization", "expo-secure-store"],
	experiments: {
		typedRoutes: true,
	},
};
