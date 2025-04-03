import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/atoms";
import { FormField, useAppForm } from "./componentBuilder";
import { useBuildFormSchema } from "./hooks";

export function SignUpForm() {
	const formSchema = useBuildFormSchema();

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
			</CardHeader>
			<form>
				<CardContent>
					<form.AppField name="email">
						{() => (
							<FormField
								label="Email"
								inputProps={{
									testID: "emailInput",
									placeholder: "Email",
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
								}}
							/>
						)}
					</form.AppField>
					<form.AppField name="confirmPassword">
						{() => (
							<FormField
								label="Confirm Password"
								inputProps={{
									secureTextEntry: true,
									testID: "confirmPasswordInput",
									placeholder: "Confirm Password",
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
			</form>
		</Card>
	);
}
