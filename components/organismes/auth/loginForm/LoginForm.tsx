import { View } from "react-native";
import { Card, CardContent, CardFooter } from "~/components/atoms";
import { useSession } from "~/context/AuthContext";
import { FormField, useLoginForm } from "./componentBuilder";
import { useBuildLoginForm } from "./hooks";

export default function LoginForm() {
	const formSchema = useBuildLoginForm();

	const { login, isLoading } = useSession();

	const form = useLoginForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			login(value);
		},
	});

	return (
		<Card className="w-full">
			<CardContent>
				<View>
					<form.AppField name="email">
						{() => (
							<FormField
								label="Email"
								inputProps={{
									placeholder: "Email",
									keyboardType: "email-address",
									autoCapitalize: "none",
								}}
							/>
						)}
					</form.AppField>
					<form.AppField name="password">
						{() => (
							<FormField
								label="Password"
								inputProps={{
									placeholder: "Password",
									secureTextEntry: true,
									autoCapitalize: "none",
									keyboardType: "visible-password",
								}}
							/>
						)}
					</form.AppField>
				</View>
			</CardContent>
			<CardFooter>
				<form.AppForm>
					<form.SubmissionButton
						label="Submit"
						testID="submitButton"
						onPress={() => form.handleSubmit()}
						buttonProps={{ disabled: isLoading, title: "Loading..." }}
					/>
				</form.AppForm>
			</CardFooter>
		</Card>
	);
}
