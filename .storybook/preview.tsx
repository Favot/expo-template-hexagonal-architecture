import type { Preview } from "@storybook/react";

const preview: Preview = {
	parameters: {
		layout: "padded",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview;
