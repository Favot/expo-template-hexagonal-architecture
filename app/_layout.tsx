import "~/global.css";

import {
	DarkTheme,
	DefaultTheme,
	type Theme,
	ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useRef, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Platform } from "react-native";
import { useIsomorphicLayoutEffect } from "~/components/atoms/generic/hooks/useIsomorphicLayoutEffect";
import { SessionProvider } from "~/context/AuthContext";
import i18n from "~/i18n/i18n";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

const LIGHT_THEME: Theme = {
	...DefaultTheme,
	colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
	...DarkTheme,
	colors: NAV_THEME.dark,
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

function RootLayout() {
	const hasMounted = useRef(false);
	const queryClient = new QueryClient();
	const { colorScheme, isDarkColorScheme } = useColorScheme();
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

	useIsomorphicLayoutEffect(() => {
		if (hasMounted.current) {
			return;
		}

		if (Platform.OS === "web") {
			// Adds the background color to the html element to prevent white background on overscroll.
			document.documentElement.classList.add("bg-background");
		}
		setAndroidNavigationBar(colorScheme);
		setIsColorSchemeLoaded(true);
		hasMounted.current = true;
	}, []);

	if (!isColorSchemeLoaded) {
		return null;
	}

	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
				<QueryClientProvider client={queryClient}>
					<SessionProvider>
						<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
						<Slot />
						<PortalHost />
					</SessionProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</I18nextProvider>
	);
}

let Layout = RootLayout;
if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
	try {
		Layout = require("../.storybook").default;
	} catch (error) {
		console.warn("Failed to load Storybook:", error);
	}
}

const App = Layout;

export default App;
