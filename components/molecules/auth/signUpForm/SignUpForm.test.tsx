import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import { I18nextProvider } from "react-i18next";
import i18n from "~/i18n/i18n";
import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
	const renderComponent = () =>
		render(
			<ThemeProvider value={DefaultTheme}>
				<I18nextProvider i18n={i18n}>
					<SignUpForm />
				</I18nextProvider>
			</ThemeProvider>,
		);

	const user = userEvent.setup();

	it("renders correctly", () => {
		const { getByPlaceholderText, getByText } = renderComponent();
		expect(getByPlaceholderText("Email")).toBeVisible();
		expect(getByPlaceholderText("Password")).toBeVisible();
		expect(getByPlaceholderText("Confirm Password")).toBeVisible();
		expect(getByText("Sign Up")).toBeVisible();
	});

	it("shows validation errors for invalid inputs", async () => {
		const { getByRole, getByText, queryAllByText } = renderComponent();

		const submitButton = getByRole("button", { name: "Submit" });

		await user.press(submitButton);

		await waitFor(() => {
			expect(getByText("Invalid email address")).toBeVisible();
		});
		expect(
			queryAllByText("Password must be at least 8 characters long"),
		).toHaveLength(2);
	});

	it("shows error when passwords don't match", async () => {
		const { getByRole, getByText, getByLabelText } = renderComponent();

		const emailInput = getByLabelText("Email");
		const passwordInput = getByLabelText("Password");
		const confirmPasswordInput = getByLabelText("Confirm Password");

		// Fill in the form with mismatched passwords

		await user.type(emailInput, "test@example.com{Enter}");
		await user.type(passwordInput, "password123{Enter}");
		await user.type(confirmPasswordInput, "password456{Enter}");

		// Trigger validation by submitting the form
		const submitButton = getByRole("button", { name: "Submit" });
		await user.press(submitButton);

		// Check for password mismatch error
		await waitFor(() => {
			expect(getByText("Passwords don't match")).toBeVisible();
		});
	});
});
