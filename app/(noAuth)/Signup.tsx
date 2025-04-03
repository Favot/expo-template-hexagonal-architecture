import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SignUpForm } from "~/components/organismes/auth/signUpForm/SignUpForm";

export default function SignupScreen() {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={100}
		>
			<ScrollView className="flex-1 " contentContainerStyle={{ flexGrow: 1 }}>
				<View className="flex-1 items-center justify-center p-2 ">
					<SignUpForm />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
