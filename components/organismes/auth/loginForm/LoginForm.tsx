import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/atoms";
import { FormField, useLoginForm } from "./componentBuilder";
import { useBuildLoginForm } from "./hooks";

export default function LoginForm() {
	const formSchema = useBuildLoginForm();

	const form = useLoginForm({
		defaultValues: {
			email: "",
			password: "",
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
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form>
					<form.AppField name="email">
						{() => (
							<FormField label="Email" inputProps={{ placeholder: "Email" }} />
						)}
					</form.AppField>
					<form.AppField name="password">
						{() => (
							<FormField
								label="Password"
								inputProps={{ placeholder: "Password" }}
							/>
						)}
					</form.AppField>
				</form>
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
