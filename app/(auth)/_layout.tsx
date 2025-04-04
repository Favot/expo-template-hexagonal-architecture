import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSession } from "~/context/AuthContext";
export default function AppLayout() {
	const { session, isLoading } = useSession();

	if (isLoading) {
		console.log("🚀 ~ AppLayout ~ isLoading:", isLoading);
		return null;
	}

	if (!session) {
		console.log("🚀 ~ AppLayout ~ session:", session);
		return <Redirect href="/(noAuth)/Login" />;
	}

	return (
		<SafeAreaView className="items-center justify-center">
			<Slot />
		</SafeAreaView>
	);
}
