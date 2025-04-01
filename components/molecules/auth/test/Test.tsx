import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import React from "react";
import { Button, Input, Text } from "~/components/atoms";
import { FormField } from "./FormField";
import { useBuildFormSchema } from "./formSchema";

export const { fieldContext, formContext, useFieldContext } =
	createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField: Input,
	},
	formComponents: {
		Button,
	},
	fieldContext,
	formContext,
});

export default function Test() {
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
	});

	const handleSubmit = () => {
		form.handleSubmit();
	};

	return (
		<form style={{ margin: 10 }} className="bg-white">
			<form.AppField name="email">
				{(field) => (
					<FormField
						field={field}
						label="Email"
						testID="emailInput"
						placeholder="Email"
					/>
				)}
			</form.AppField>
			<form.AppField name="password">
				{(field) => (
					<FormField
						field={field}
						label="Password"
						testID="passwordInput"
						placeholder="Password"
						secureTextEntry
					/>
				)}
			</form.AppField>
			<form.AppField name="confirmPassword">
				{(field) => (
					<FormField
						field={field}
						label="Confirm Password"
						testID="confirmPasswordInput"
						placeholder="Confirm Password"
						secureTextEntry
					/>
				)}
			</form.AppField>
			<form.AppForm>
				<form.Button testID="submitButton" onPress={handleSubmit}>
					<Text>Submit</Text>
				</form.Button>
			</form.AppForm>
		</form>
	);
}
