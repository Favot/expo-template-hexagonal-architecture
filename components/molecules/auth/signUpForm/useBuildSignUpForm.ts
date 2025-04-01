import { useTranslation } from "react-i18next";
import { z } from "zod";

export const useBuildSignUpForm = () => {
	const { t } = useTranslation();
	return z
		.object({
			email: z.string().email({ message: t("form.email.invalidAdress") }),
			password: z
				.string()
				.min(8, { message: t("form.password.lenghtRequirement") }),
			confirmPassword: z
				.string()
				.min(8, { message: t("form.password.lenghtRequirement") }),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t("form.password.missMatch"),
			path: ["confirmPassword"],
		});
};

export type SignUpFormSchema = z.infer<ReturnType<typeof useBuildSignUpForm>>;
