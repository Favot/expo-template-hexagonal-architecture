import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { view } from "./storybook.requires";

// Create a web-compatible storage implementation
const webStorage = {
	getItem: (key: string) => {
		try {
			return Promise.resolve(localStorage.getItem(key));
		} catch (e) {
			return Promise.resolve(null);
		}
	},
	setItem: (key: string, value: string) => {
		try {
			return Promise.resolve(localStorage.setItem(key, value));
		} catch (e) {
			return Promise.resolve();
		}
	},
};

const StorybookUIRoot = view.getStorybookUI({
	storage: Platform.OS === "web" ? webStorage : AsyncStorage,
});

export default StorybookUIRoot;
