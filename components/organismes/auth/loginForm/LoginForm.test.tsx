import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const mockLogin = jest.fn();

jest.mock("~/context/AuthContext", () => ({
	useSession: () => ({
		login: mockLogin,
		isLoading: false,
	}),
}));

describe("LoginForm", () => {
	const renderLoginForm = () => {
		const queryClient = new QueryClient();

		return render(
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18n}>
					<LoginForm />
				</I18nextProvider>
			</QueryClientProvider>,
		);
	};

	const user = userEvent.setup();

	it("should display all the correct elements", () => {
		const { getByText, getByPlaceholderText } = renderLoginForm();

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

	it("should call the auth service login when the form is submitted", async () => {
		const { getByPlaceholderText, getByRole } = renderLoginForm();

		const emailInput = getByPlaceholderText("Email");
		const passwordInput = getByPlaceholderText("Password");

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");

		const submitButton = getByRole("button", { name: "Submit" });
		await user.press(submitButton);

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
			});
		});
	});
});
