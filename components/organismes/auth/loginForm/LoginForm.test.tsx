import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import {
	render,
	screen,
	userEvent,
	waitFor,
} from "@testing-library/react-native";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "~/i18n/i18n";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
	const renderLoginForm = () =>
		render(
			<ThemeProvider value={DefaultTheme}>
				<I18nextProvider i18n={i18n}>
					<LoginForm />
				</I18nextProvider>
			</ThemeProvider>,
		);

	const user = userEvent.setup();

	it("should display all the correct elements", () => {
		const { getByText, getByPlaceholderText } = renderLoginForm();

		expect(getByText("Login")).toBeVisible();

		expect(getByPlaceholderText("Email")).toBeVisible();
		expect(getByPlaceholderText("Password")).toBeVisible();

		expect(getByText("Submit")).toBeVisible();
	});

	it("should display validation errors when form is submitted empty", async () => {
		const { getByText } = renderLoginForm();

		const submitButton = screen.getByText("Submit");
		await user.press(submitButton);

		await waitFor(() => {
			expect(getByText("Invalid email address")).toBeVisible();
		});
		expect(
			getByText("Password must be at least 8 characters long"),
		).toBeVisible();
	});

	it("should call onSubmit with correct data when form is submitted with valid inputs", async () => {
		const consoleSpy = jest.spyOn(global.console, "log");

		const { getByPlaceholderText, getByRole } = renderLoginForm();

		const emailInput = getByPlaceholderText("Email");
		const passwordInput = getByPlaceholderText("Password");

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");

		const submitButton = getByRole("button", { name: "Submit" });
		await user.press(submitButton);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
			});
		});

		consoleSpy.mockRestore();
	});
});
