import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Text } from "~/components/atoms";
import { useSession } from "~/context/AuthContext";
export default function AppLayout() {
	const { session, isLoading, logout } = useSession();
	const { t } = useTranslation();

	if (isLoading) {
		return null;
	}

	if (!session) {
		return <Redirect href="/(noAuth)/Login" />;
	}

	return (
		<View>
			<Text>Hello</Text>
			<Button onPress={logout}>
				<Text>{t("auth.common.logout")}</Text>
			</Button>
		</View>
	);
}
