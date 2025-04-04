import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSession } from "~/context/AuthContext";
export default function AppLayout() {
	const { session, isLoading } = useSession();

	if (isLoading) {
		return null;
	}

	if (!session) {
		return <Redirect href="/(noAuth)/Login" />;
	}

	return (
		<SafeAreaView className="items-center justify-center">
			<Slot />
		</SafeAreaView>
	);
}
