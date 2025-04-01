import * as React from "react";
import { useImperativeHandle } from "react";

interface AugmentRefProps<T> {
	ref: React.Ref<T>;
	methods?: Record<string, (...args: unknown[]) => unknown>;
	deps?: unknown[];
}

export function useAugmentedRef<T>({
	ref,
	methods,
	deps = [],
}: AugmentRefProps<T>) {
	const augmentedRef = React.useRef<T>(null);
	useImperativeHandle(
		ref,
		() => {
			if (typeof augmentedRef === "function" || !augmentedRef?.current) {
				return {} as T;
			}
			return {
				...augmentedRef.current,
				...methods,
			};
		},
		[...deps, methods],
	);
	return augmentedRef;
}
