import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "~/i18n/i18n";
import { SignUpForm } from "./SignUpForm";

// Create a mock for the entire serviceRegistry
const mockSignUp = jest.fn();

jest.mock("~/context/AuthContext", () => ({
	useSession: () => ({
		signUpWithEmail: mockSignUp,
		isLoading: false,
	}),
}));

describe("SignUpForm", () => {
	beforeEach(() => {
		mockSignUp.mockClear();
	});

	const renderComponent = () => {
		const queryClient = new QueryClient();
		return render(
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18n}>
					<SignUpForm />
				</I18nextProvider>
			</QueryClientProvider>,
		);
	};

	const user = userEvent.setup({ delay: 0 }); // Disable artificial delays

	it("should display all the correct elements", async () => {
		const { getByText, getByPlaceholderText } = renderComponent();

		await waitFor(() => {
			expect(getByPlaceholderText("Email")).toBeVisible();
			expect(getByPlaceholderText("Password")).toBeVisible();
			expect(getByPlaceholderText("Confirm Password")).toBeVisible();
		});
		expect(getByText("Submit")).toBeVisible();
	});

	it("should trigger error for empty input", async () => {
		const { getByTestId, queryAllByText } = renderComponent();

		await user.press(getByTestId("submitButton"));

		await waitFor(() => {
			expect(queryAllByText("Invalid email address")).toHaveLength(1);
			expect(
				queryAllByText("Password must be at least 8 characters long"),
			).toHaveLength(2);
		});
	});

	it("should trigger error for password mismatch", async () => {
		const { getByTestId, getByText, getByPlaceholderText } = renderComponent();

		await user.type(getByPlaceholderText("Email"), "test@example.com");
		await user.type(getByTestId("passwordInput"), "password123");
		await user.type(getByTestId("confirmPasswordInput"), "password456");

		await user.press(getByTestId("submitButton"));

		expect(getByText("Passwords don't match")).toBeTruthy();
	});

	it("should call the auth service signUp when the form is submitted", async () => {
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
			expect(mockSignUp).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
				passwordConfirmation: "password123",
			});
		});
	});
});
