import { KeyboardAvoidingView, Platform, View } from "react-native";
import LoginForm from "~/components/organismes/auth/loginForm/LoginForm";

export default function SignInScreen() {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View className="flex-1 items-center justify-center p-2">
				<LoginForm />
			</View>
		</KeyboardAvoidingView>
	);
}
