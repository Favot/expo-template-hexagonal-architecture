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
import { type LoginFormShema, useBuildLoginForm } from "./useBuildLoginForm";

export default function LoginForm() {
	const loginForm = useBuildLoginForm();

	const { control, handleSubmit } = useForm<LoginFormShema>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginForm),
	});
	const onSubmit = () => {
		handleSubmit((data) => {
			console.log(data);
		})();
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Text>Login</Text>
				</CardTitle>
			</CardHeader>
			<CardContent className="gap-4">
				<InputFormField control={control} name="email" placeholder="Email" />
				<InputFormField
					control={control}
					name="password"
					placeholder="Password"
					secureTextEntry={true}
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
	control: Control<LoginFormShema>;
	name: keyof LoginFormShema;
	className?: string;
}

const InputFormField = ({
	control,
	name,
	className,
	...inputProps
}: InputFormFieldProps) => (
	<Controller
		control={control}
		name={name}
		rules={{
			required: true,
		}}
		render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
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
