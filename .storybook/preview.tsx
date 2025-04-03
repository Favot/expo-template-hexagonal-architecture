import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import type { Preview } from "@storybook/react";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { View } from "react-native";
import i18n from "../i18n/i18n";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		(Story) => (
			<ThemeProvider value={DefaultTheme}>
				<I18nextProvider i18n={i18n}>
					<View
						style={{
							backgroundColor: "#eaeaeaea",
							height: "100%",
							width: "auto",
							padding: 20,
						}}
					>
						<Story />
					</View>
				</I18nextProvider>
			</ThemeProvider>
		),
	],
};

export default preview;
