import { createFormHookContexts } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const useBuildFormSchema = () => {
	const { t } = useTranslation();

	return z
		.object({
			email: z.string().email({ message: t("form.email.invalidAdress") }),
			password: z.string().min(8, t("form.password.lenghtRequirement")),
			confirmPassword: z.string().min(8, t("form.password.lenghtRequirement")),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t("form.password.missMatch"),
			path: ["confirmPassword"],
		});
};

export type FormSchema = z.infer<ReturnType<typeof useBuildFormSchema>>;
