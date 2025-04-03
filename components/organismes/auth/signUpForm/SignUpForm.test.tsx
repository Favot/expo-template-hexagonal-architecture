import {
	act,
	fireEvent,
	render,
	userEvent,
	waitFor,
} from "@testing-library/react-native";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "~/i18n/i18n";
import { SignUpForm } from "./SignUpForm";

describe("SignUpForm", () => {
	const renderComponent = () => {
		return render(
			<I18nextProvider i18n={i18n}>
				<SignUpForm />
			</I18nextProvider>,
		);
	};

	const user = userEvent.setup();

	it("should display all the correct elements", () => {
		const { getByText, getByPlaceholderText } = renderComponent();

		expect(getByText("Sign Up")).toBeVisible();

		expect(getByPlaceholderText("Email")).toBeVisible();
		expect(getByPlaceholderText("Password")).toBeVisible();
		expect(getByPlaceholderText("Confirm Password")).toBeVisible();

		expect(getByText("Submit")).toBeVisible();
	});

	it("should trigger error for empty input", async () => {
		const { getByTestId, queryAllByText } = renderComponent();

		await user.press(getByTestId("submitButton"));

		await waitFor(() => {
			expect(queryAllByText("Invalid email address")).toHaveLength(1);
		});
		expect(
			queryAllByText("Password must be at least 8 characters long"),
		).toHaveLength(2);
	});

	it("should trigger error for password mismatch", async () => {
		const { getByTestId, getByText, getByPlaceholderText } = renderComponent();

		await user.type(getByPlaceholderText("Email"), "test@example.com");
		await user.type(getByTestId("passwordInput"), "password123");
		await user.type(getByTestId("confirmPasswordInput"), "password456");

		await act(async () => {
			fireEvent.press(getByTestId("submitButton"));
		});

		expect(getByText("Passwords don't match")).toBeTruthy();
	});

	it("should call onSubmit with correct data when form is submitted with valid inputs", async () => {
		const consoleSpy = jest.spyOn(global.console, "log");

		const { getByPlaceholderText, getByRole } = renderComponent();

		const emailInput = getByPlaceholderText("Email");
		const passwordInput = getByPlaceholderText("Password");
		const confirmPasswordInput = getByPlaceholderText("Confirm Password");

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");
		await user.type(confirmPasswordInput, "password123");

		const submitButton = getByRole("button", { name: "Submit" });
		await user.press(submitButton);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
				confirmPassword: "password123",
			});
		});

		consoleSpy.mockRestore();
	});
});
