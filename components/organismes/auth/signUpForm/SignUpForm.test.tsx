import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "~/i18n/i18n";
import { SignUpForm } from "./SignUpForm";

describe("Test", () => {
	const renderComponent = () => {
		return render(
			<I18nextProvider i18n={i18n}>
				<SignUpForm />
			</I18nextProvider>,
		);
	};

	it("should not trigger error for correct values", async () => {
		const { getByTestId, queryByTestId } = renderComponent();

		fireEvent.changeText(getByTestId("emailInput"), "test@example.com");
		fireEvent.changeText(getByTestId("passwordInput"), "password123");
		fireEvent.changeText(getByTestId("confirmPasswordInput"), "password123");

		await act(async () => {
			fireEvent.press(getByTestId("submitButton"));
		});

		expect(queryByTestId("emailErrorText")).not.toBeTruthy();
		expect(queryByTestId("passwordErrorText")).not.toBeTruthy();
		expect(queryByTestId("confirmPasswordErrorText")).not.toBeTruthy();
	});

	it("should trigger error for empty input", async () => {
		const { getByTestId, queryAllByText } = renderComponent();

		await act(async () => {
			fireEvent.press(getByTestId("submitButton"));
		});

		await waitFor(() => {
			expect(queryAllByText("Invalid email address")).toHaveLength(1);
			expect(
				queryAllByText("Password must be at least 8 characters long"),
			).toHaveLength(2);
		});
	});

	it("should trigger error for password mismatch", async () => {
		const { getByTestId, getByText, getByPlaceholderText } = renderComponent();

		fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
		fireEvent.changeText(getByTestId("passwordInput"), "password123");
		fireEvent.changeText(getByTestId("confirmPasswordInput"), "password456");

		await act(async () => {
			fireEvent.press(getByTestId("submitButton"));
		});

		await waitFor(() => {
			expect(getByText("Passwords don't match")).toBeTruthy();
		});
	});
});
