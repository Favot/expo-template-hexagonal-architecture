import { zodResolver } from "@hookform/resolvers/zod";
import type { Control } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type { TextInputProps } from "react-native";
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	FormInput,
	Text,
} from "../../../atoms";
import {
	type SignUpFormSchema,
	useBuildSignUpForm,
} from "./useBuildSignUpForm";

export default function SignUpForm() {
	const signUpForm = useBuildSignUpForm();

	const { control, handleSubmit } = useForm<SignUpFormSchema>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(signUpForm),
	});

	const onSubmit = async () => {
		handleSubmit((data) => {
			console.log(data);
		})();
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Text>Sign Up</Text>
				</CardTitle>
			</CardHeader>
			<CardContent className="gap-4">
				<InputFormField
					control={control}
					name="email"
					placeholder="Email"
					testID="emailInput"
				/>
				<InputFormField
					control={control}
					name="password"
					placeholder="Password"
					secureTextEntry={true}
					testID="passwordInput"
				/>
				<InputFormField
					control={control}
					name="confirmPassword"
					placeholder="Confirm Password"
					secureTextEntry={true}
					testID="confirmPasswordInput"
				/>
			</CardContent>
			<CardFooter>
				<Button onPress={onSubmit} aria-label="Submit">
					<Text>Submit</Text>
				</Button>
			</CardFooter>
		</Card>
	);
}

interface InputFormFieldProps
	extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
	control: Control<SignUpFormSchema>;
	name: keyof SignUpFormSchema;
	className?: string;
}

const InputFormField = ({
	control,
	name,
	className,
	...inputProps
}: InputFormFieldProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error },
			}) => (
				<FormInput
					{...inputProps}
					className={className}
					error={error}
					onBlur={onBlur}
					onChange={onChange}
					value={value}
				/>
			)}
		/>
	);
};
