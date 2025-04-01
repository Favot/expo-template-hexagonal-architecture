import { createFormHook, useStore } from "@tanstack/react-form";
import type { TextInputProps } from "react-native";
import { Button, Text } from "~/components/atoms";
import { FormInput } from "~/components/molecules";
import {
	fieldContext,
	formContext,
	useFieldContext,
	useFormContext,
} from "./hooks";

type FormFieldProps = {
	label: string;
	inputProps?: TextInputProps;
};

export const FormField = ({ label, inputProps }: FormFieldProps) => {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);
	const errorMessage = errors?.[0]?.message ?? undefined;

	return (
		<FormInput
			label={label}
			inputProps={inputProps}
			value={field.state.value}
			onChangeText={field.handleChange}
			errorMessage={errorMessage}
		/>
	);
};

function SubmissionButton({
	label,
	onPress,
	testID,
}: {
	readonly label: string;
	readonly onPress: () => void;
	readonly testID: string;
}) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button disabled={isSubmitting} onPress={onPress} testID={testID}>
					<Text>{label}</Text>
				</Button>
			)}
		</form.Subscribe>
	);
}

export const { useAppForm: useLoginForm } = createFormHook({
	fieldComponents: {},
	formComponents: {
		SubmissionButton,
	},
	fieldContext,
	formContext,
});
