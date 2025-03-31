import {
	type NativeSyntheticEvent,
	type TextInputChangeEventData,
	type TextInputProps,
	View,
} from "react-native";
import { Input } from "./input";
import { Text } from "./text";

export interface FormInputProps
	extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
	onBlur: () => void;
	onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
	value: string;
	error?: { message?: string };
	className?: string;
}

export const FormInput = ({
	className,
	error,
	onBlur,
	onChange,
	value,
	...inputProps
}: FormInputProps) => (
	<View className={className}>
		<Input {...inputProps} onBlur={onBlur} onChange={onChange} value={value} />
		{error && <Text className="text-red-500">{error.message}</Text>}
	</View>
);
