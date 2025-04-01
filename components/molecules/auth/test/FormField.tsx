import type React from "react";
import { View } from "react-native";
import type { z } from "zod";
import { Text } from "~/components/atoms";
import type { useBuildFormSchema } from "./formSchema";

type FormSchema = z.infer<ReturnType<typeof useBuildFormSchema>>;

type FormFieldProps<T> = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	field: any;
	label: string;
	testID: string;
	placeholder: string;
	secureTextEntry?: boolean;
};

export const FormField: React.FC<FormFieldProps<FormSchema>> = ({
	field,
	label,
	testID,
	placeholder,
	secureTextEntry,
}) => {
	return (
		<View>
			<field.TextField
				label={label}
				testID={testID}
				placeholder={placeholder}
				value={field.state.value}
				onChangeText={field.handleChange}
				secureTextEntry={secureTextEntry}
			/>
			{field.state.meta.errors ? (
				<Text testID={`${testID}ErrorText`}>
					{field.state.meta.errors[0]?.message}
				</Text>
			) : null}
		</View>
	);
};
