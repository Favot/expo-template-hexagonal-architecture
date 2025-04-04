import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Button, Text } from "~/components/atoms";
import { useSession } from "~/context/AuthContext";

export default function Home() {
	const { logout } = useSession();
	return (
		<SafeAreaView className="flex-1 items-center justify-center">
			<ThemeToggle />
			<Button onPress={logout}>
				<Text>Logout</Text>
			</Button>
			<Text>Home</Text>
		</SafeAreaView>
	);
}
