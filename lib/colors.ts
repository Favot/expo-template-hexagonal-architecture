export const COLOR = {
	light: {
		background:
			process.env.EXPO_PUBLIC_THEME_LIGHT_BACKGROUND ?? "hsl(0 0% 100%)", // background
		border: process.env.EXPO_PUBLIC_THEME_LIGHT_BORDER ?? "hsl(240 5.9% 90%)", // border
		card: process.env.EXPO_PUBLIC_THEME_LIGHT_CARD ?? "hsl(0 0% 100%)", // card
		notification:
			process.env.EXPO_PUBLIC_THEME_LIGHT_NOTIFICATION ?? "hsl(0 84.2% 60.2%)", // destructive
		primary: process.env.EXPO_PUBLIC_THEME_LIGHT_PRIMARY ?? "hsl(240 5.9% 10%)", // primary
		text: process.env.EXPO_PUBLIC_THEME_LIGHT_TEXT ?? "hsl(240 10% 3.9%)", // foreground
	},
	dark: {
		background:
			process.env.EXPO_PUBLIC_THEME_DARK_BACKGROUND ?? "hsl(240 10% 3.9%)", // background
		border: process.env.EXPO_PUBLIC_THEME_DARK_BORDER ?? "hsl(240 3.7% 15.9%)", // border
		card: process.env.EXPO_PUBLIC_THEME_DARK_CARD ?? "hsl(240 10% 3.9%)", // card
		notification:
			process.env.EXPO_PUBLIC_THEME_DARK_NOTIFICATION ?? "hsl(0 72% 51%)", // destructive
		primary: process.env.EXPO_PUBLIC_THEME_DARK_PRIMARY ?? "hsl(0 0% 98%)", // primary
		text: process.env.EXPO_PUBLIC_THEME_DARK_TEXT ?? "hsl(0 0% 98%)", // foreground
	},
};
