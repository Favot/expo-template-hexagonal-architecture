import type React from "react";
import type { TextInputProps } from "react-native";
import { View } from "react-native";
import { Input, Text } from "~/components/atoms";

type FormInputProps = {
	label: string;
	value: string;
	onChangeText: (value: string) => void;
	errorMessage?: string;
	inputProps?: TextInputProps;
};

export const FormInput = ({
	label,
	value,
	onChangeText,
	errorMessage,
	inputProps,
}: FormInputProps) => {
	return (
		<View className="p-2">
			<View>
				<Text className="p-1">{label}</Text>
				<Input {...inputProps} value={value} onChangeText={onChangeText} />
			</View>
			{errorMessage ? (
				<Text variant="caption2" className="p-2 text-destructive">
					{errorMessage}
				</Text>
			) : null}
		</View>
	);
};
