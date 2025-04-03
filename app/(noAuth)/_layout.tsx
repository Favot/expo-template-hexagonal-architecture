import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="Login"
				options={{
					title: "Login",
				}}
			/>
			<Tabs.Screen
				name="Signup"
				options={{
					title: "Signup",
				}}
			/>
		</Tabs>
	);
}
