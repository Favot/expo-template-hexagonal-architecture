import { createFormHookContexts } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const useBuildLoginForm = () => {
	const { t } = useTranslation();
	return z.object({
		email: z.string().email({ message: t("form.email.invalidAdress") }),
		password: z
			.string()
			.min(8, { message: t("form.password.lenghtRequirement") }),
	});
};
export type LoginFormShema = z.infer<ReturnType<typeof useBuildLoginForm>>;
