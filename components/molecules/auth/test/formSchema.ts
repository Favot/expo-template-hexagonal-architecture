import { z } from "zod";

export const useBuildFormSchema = () => {
	return z
		.object({
			email: z.string().email("Invalid email address"),
			password: z
				.string()
				.min(8, "Password must be at least 8 characters long"),
			confirmPassword: z
				.string()
				.min(8, "Password must be at least 8 characters long"),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ["confirmPassword"],
		});
};

export type FormSchema = z.infer<ReturnType<typeof useBuildFormSchema>>;
