const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const config = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

console.log(process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true");

const storybookConfig = withStorybook(nativeWindConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
  configPath: path.resolve(__dirname, "./.storybook"),
});

module.exports = storybookConfig;
