import React from "react";
import { Card, CardContent, CardFooter } from "~/components/atoms";
import { useSession } from "~/context/AuthContext";
import { FormField, useAppForm } from "./componentBuilder";
import { useBuildFormSchema } from "./hooks";

export function SignUpForm() {
	const { signUpWithEmail } = useSession();

	const formSchema = useBuildFormSchema();

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
			passwordConfirmation: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			signUpWithEmail({
				email: value.email,
				password: value.password,
				passwordConfirmation: value.passwordConfirmation,
			});
		},
	});

	return (
		<Card className="w-full">
			<CardContent>
				<form.AppField name="email">
					{() => (
						<FormField
							label="Email"
							inputProps={{
								testID: "emailInput",
								placeholder: "Email",
								autoCapitalize: "none",
								keyboardType: "email-address",
							}}
						/>
					)}
				</form.AppField>
				<form.AppField name="password">
					{() => (
						<FormField
							label="Password"
							inputProps={{
								secureTextEntry: true,
								testID: "passwordInput",
								placeholder: "Password",
								autoCapitalize: "none",
								keyboardType: "visible-password",
							}}
						/>
					)}
				</form.AppField>
				<form.AppField name="passwordConfirmation">
					{() => (
						<FormField
							label="Confirm Password"
							inputProps={{
								secureTextEntry: true,
								testID: "confirmPasswordInput",
								placeholder: "Confirm Password",
								keyboardType: "visible-password",
							}}
						/>
					)}
				</form.AppField>
			</CardContent>
			<CardFooter>
				<form.AppForm>
					<form.SubmissionButton
						label="Submit"
						testID="submitButton"
						onPress={() => form.handleSubmit()}
					/>
				</form.AppForm>
			</CardFooter>
		</Card>
	);
}
