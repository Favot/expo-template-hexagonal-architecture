const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

// Add extraNodeModules to exclude Storybook when disabled
if (!isStorybookEnabled) {
	config.resolver.extraNodeModules = {
		...config.resolver.extraNodeModules,
		"@storybook/core/manager-api": isStorybookEnabled,
		"@storybook/core/preview-api": isStorybookEnabled,
		"@storybook/csf": isStorybookEnabled,
		"@storybook/core/channels": isStorybookEnabled,
		"@storybook/react-native": isStorybookEnabled,
		"@storybook/core": isStorybookEnabled,
		"@storybook/addons": isStorybookEnabled,
		"@storybook/types": isStorybookEnabled,
		"@storybook/testing-library": isStorybookEnabled,
		"@storybook/addon-essentials": isStorybookEnabled,
		"@storybook/addon-interactions": isStorybookEnabled,
		"@storybook/addon-links": isStorybookEnabled,
		"@storybook/blocks": isStorybookEnabled,
		"@storybook/react": isStorybookEnabled,
		"@storybook/testing-library-react": isStorybookEnabled,
		"@storybook/testing-library-react-native": isStorybookEnabled,
	};

	// Exclude Storybook from the resolver
	config.resolver.blockList = [/\.storybook\/.*/, /@storybook\/.*/];
}

const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

if (isStorybookEnabled) {
	const withStorybook = require("@storybook/react-native/metro/withStorybook");
	const storybookConfig = withStorybook(nativeWindConfig, {
		enabled: true,
		configPath: path.resolve(__dirname, "./.storybook"),
	});
	module.exports = storybookConfig;
} else {
	module.exports = nativeWindConfig;
}
