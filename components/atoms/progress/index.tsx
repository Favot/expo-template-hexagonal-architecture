import * as React from "react";
import { Platform, View } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from "react-native-reanimated";
import { cn } from "~/lib/utils";
import { Indicator as IndicatorPrimitive, Root } from "./primitive";
import type { RootProps, RootRef } from "./types";

const Progress = React.forwardRef<
	RootRef,
	RootProps & {
		indicatorClassName?: string;
	}
>(({ className, value, indicatorClassName, ...props }, ref) => {
	return (
		<Root
			ref={ref}
			className={cn(
				"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
				className,
			)}
			{...props}
		>
			<Indicator value={value} className={indicatorClassName} />
		</Root>
	);
});
Progress.displayName = Root.displayName;

export { Progress };

function Indicator({
	value,
	className,
}: {
	readonly value: number | undefined | null;
	readonly className?: string;
}) {
	const progress = useDerivedValue(() => value ?? 0);

	const indicator = useAnimatedStyle(() => {
		return {
			width: withSpring(
				`${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
				{ overshootClamping: true },
			),
		};
	});

	if (Platform.OS === "web") {
		return (
			<View
				className={cn(
					"h-full w-full flex-1 bg-primary web:transition-all",
					className,
				)}
				style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
			>
				<IndicatorPrimitive className={cn("h-full w-full ", className)} />
			</View>
		);
	}

	return (
		<IndicatorPrimitive asChild>
			<Animated.View
				style={indicator}
				className={cn("h-full bg-foreground", className)}
			/>
		</IndicatorPrimitive>
	);
}
