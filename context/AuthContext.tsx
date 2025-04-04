import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import type { LoginCommand, Session, SignUpCommand } from "~/domain";
import { useServiceRegistry } from "~/gateway/serviceRegistry";

const SessionContext = createContext<{
	login: (loginCommande: LoginCommand) => Promise<void>;
	signUpWithEmail: (signUpCommand: SignUpCommand) => Promise<void>;
	logout: () => void;
	session: Session | null;
	isLoading: boolean;
}>({
	login: async () => Promise.resolve(),
	signUpWithEmail: async () => Promise.resolve(),
	logout: () => null,
	session: null,
	isLoading: false,
});

export function useSession() {
	const value = useContext(SessionContext);
	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useSession must be wrapped in a <SessionProvider />");
		}
	}

	return value;
}

export type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

export type LocalStorageKey = "Session";

export function useAsyncState<T>(
	initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
	return useReducer(
		(
			state: [boolean, T | null],
			action: T | null = null,
		): [boolean, T | null] => [false, action],
		initialValue,
	) as UseStateHook<T>;
}

export const useSessionStorageState = (): UseStateHook<Session | null> => {
	const [session, setSession] = useAsyncState<Session | null>();

	const { sessionService } = useServiceRegistry();

	const { mutate: getSessionMutation } = useMutation({
		mutationFn: sessionService.getSession,
		onSuccess: (data) => {
			console.log("🚀 ~ getSessionMutation:", data);
			setSession(data);
		},
	});

	const { mutate: setSessionMutation } = useMutation({
		mutationFn: sessionService.setSession,
		onSuccess: (value) => {
			setSession(value);
			if (!value) {
				router.replace("/(noAuth)/Login");
			}

			router.replace("/(auth)");
		},
	});

	useEffect(() => {
		getSessionMutation();
	}, [getSessionMutation]);

	const setValue = useCallback(
		(value: Session | null) => {
			setSessionMutation(value);
		},

		[setSessionMutation],
	);

	return [session, setValue];
};

export function SessionProvider({ children }: Readonly<PropsWithChildren>) {
	const { authService } = useServiceRegistry();

	const [[isLoading, session], setSession] = useSessionStorageState();

	const { mutate: loginMutation } = useMutation({
		mutationFn: authService.login,
		onSuccess: (data) => {
			setSession(data);
		},
	});

	const { mutate: signUpMutation } = useMutation({
		mutationFn: authService.signUp,
		onSuccess: (data) => {
			setSession(data);
		},
	});

	const { mutate: signOutMutation } = useMutation({
		mutationFn: authService.logout,
		onSuccess: () => {
			setSession(null);
		},
	});

	const value = useMemo(
		() => ({
			login: async (loginCommande: LoginCommand) =>
				loginMutation(loginCommande),
			signUpWithEmail: async (signUpCommand: SignUpCommand) =>
				signUpMutation(signUpCommand),
			logout: () => signOutMutation(),
			session,
			isLoading,
		}),
		[loginMutation, signUpMutation, signOutMutation, session, isLoading],
	);

	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
}
