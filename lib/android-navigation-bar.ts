import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { COLOR } from "~/lib/colors";

export async function setAndroidNavigationBar(theme: "light" | "dark") {
	if (Platform.OS !== "android") return;
	await NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
	await NavigationBar.setBackgroundColorAsync(
		theme === "dark" ? COLOR.dark.background : COLOR.light.background,
	);
}
