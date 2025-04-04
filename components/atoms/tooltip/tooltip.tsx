import {
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import {
	BackHandler,
	type GestureResponderEvent,
	type LayoutChangeEvent,
	type LayoutRectangle,
	Pressable,
	View,
} from "react-native";
import {
	type LayoutPosition,
	useAugmentedRef,
	useRelativePosition,
} from "../generic/hooks";
import { Portal as RNPPortal } from "../generic/portal";
import * as Slot from "../generic/slot";
import type {
	ContentProps,
	ContentRef,
	OverlayProps,
	OverlayRef,
	PortalProps,
	RootProps,
	RootRef,
	TriggerProps,
	TriggerRef,
} from "./types";

interface IRootContext {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	triggerPosition: LayoutPosition | null;
	setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
	contentLayout: LayoutRectangle | null;
	setContentLayout: (contentLayout: LayoutRectangle | null) => void;
	nativeID: string;
}

const RootContext = createContext<IRootContext | null>(null);

const Root = forwardRef<RootRef, RootProps>(
	(
		{
			asChild,
			delayDuration: _delayDuration,
			skipDelayDuration: _skipDelayDuration,
			disableHoverableContent: _disableHoverableContent,
			onOpenChange: onOpenChangeProp,
			...viewProps
		},
		ref,
	) => {
		const nativeID = useId();
		const [triggerPosition, setTriggerPosition] =
			useState<LayoutPosition | null>(null);
		const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
			null,
		);
		const [open, setOpen] = useState(false);

		const onOpenChange = useCallback(
			(value: boolean) => {
				setOpen(value);
				onOpenChangeProp?.(value);
			},
			[onOpenChangeProp],
		);

		const contextValue = useMemo(
			() => ({
				open,
				onOpenChange,
				contentLayout,
				nativeID,
				setContentLayout,
				setTriggerPosition,
				triggerPosition,
			}),
			[open, onOpenChange, contentLayout, nativeID, triggerPosition],
		);

		const Component = asChild ? Slot.View : View;
		return (
			<RootContext.Provider value={contextValue}>
				<Component ref={ref} {...viewProps} />
			</RootContext.Provider>
		);
	},
);

Root.displayName = "RootNativeTooltip";

function useTooltipContext() {
	const context = useContext(RootContext);
	if (!context) {
		throw new Error(
			"Tooltip compound components cannot be rendered outside the Tooltip component",
		);
	}
	return context;
}

const Trigger = forwardRef<TriggerRef, TriggerProps>(
	({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
		const { open, onOpenChange, setTriggerPosition } = useTooltipContext();

		const augmentedRef = useAugmentedRef({
			ref,
			methods: {
				open: () => {
					onOpenChange(true);
					augmentedRef.current?.measure(
						(_x, _y, width, height, pageX, pageY) => {
							setTriggerPosition({ width, pageX, pageY: pageY, height });
						},
					);
				},
				close: () => {
					setTriggerPosition(null);
					onOpenChange(false);
				},
			},
		});

		function onPress(ev: GestureResponderEvent) {
			if (disabled) return;
			augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
				setTriggerPosition({ width, pageX, pageY: pageY, height });
			});
			const newValue = !open;
			onOpenChange(newValue);
			onPressProp?.(ev);
		}

		const Component = asChild ? Slot.Pressable : Pressable;
		return (
			<Component
				ref={augmentedRef}
				aria-disabled={disabled ?? undefined}
				role="button"
				onPress={onPress}
				disabled={disabled ?? undefined}
				{...props}
			/>
		);
	},
);

Trigger.displayName = "TriggerNativeTooltip";

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: Readonly<PortalProps>) {
	const value = useTooltipContext();

	if (!value.triggerPosition) {
		return null;
	}

	if (!forceMount) {
		if (!value.open) {
			return null;
		}
	}

	return (
		<RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
			<RootContext.Provider value={value}>{children}</RootContext.Provider>
		</RNPPortal>
	);
}

const Overlay = forwardRef<OverlayRef, OverlayProps>(
	(
		{
			asChild,
			forceMount,
			onPress: OnPressProp,
			closeOnPress = true,
			...props
		},
		ref,
	) => {
		const { open, onOpenChange, setContentLayout, setTriggerPosition } =
			useTooltipContext();

		function onPress(ev: GestureResponderEvent) {
			if (closeOnPress) {
				setTriggerPosition(null);
				setContentLayout(null);
				onOpenChange(false);
			}
			OnPressProp?.(ev);
		}

		if (!forceMount) {
			if (!open) {
				return null;
			}
		}

		const Component = asChild ? Slot.Pressable : Pressable;
		return <Component ref={ref} onPress={onPress} {...props} />;
	},
);

Overlay.displayName = "OverlayNativeTooltip";

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior on native by setting `disablePositioningStyle` to `true`.
 */
const Content = forwardRef<ContentRef, ContentProps>(
	(
		{
			asChild = false,
			forceMount,
			align = "center",
			side = "top",
			sideOffset = 0,
			alignOffset = 0,
			avoidCollisions = true,
			onLayout: onLayoutProp,
			insets,
			style,
			disablePositioningStyle,
			...props
		},
		ref,
	) => {
		const {
			open,
			onOpenChange,
			nativeID,
			contentLayout,
			setContentLayout,
			setTriggerPosition,
			triggerPosition,
		} = useTooltipContext();

		useEffect(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				() => {
					setTriggerPosition(null);
					setContentLayout(null);
					onOpenChange(false);
					return true;
				},
			);

			return () => {
				setContentLayout(null);
				backHandler.remove();
			};
		}, [onOpenChange, setContentLayout, setTriggerPosition]);

		const positionStyle = useRelativePosition({
			align,
			avoidCollisions,
			triggerPosition,
			contentLayout,
			alignOffset,
			insets,
			sideOffset,
			side: getNativeSide(side),
			disablePositioningStyle,
		});

		function onLayout(event: LayoutChangeEvent) {
			setContentLayout(event.nativeEvent.layout);
			onLayoutProp?.(event);
		}

		if (!forceMount) {
			if (!open) {
				return null;
			}
		}

		const Component = asChild ? Slot.View : View;
		return (
			<Component
				ref={ref}
				role="tooltip"
				nativeID={nativeID}
				style={[positionStyle, style]}
				onLayout={onLayout}
				onStartShouldSetResponder={onStartShouldSetResponder}
				{...props}
			/>
		);
	},
);

Content.displayName = "ContentNativeTooltip";

export { Content, Overlay, Portal, Root, Trigger };

function onStartShouldSetResponder() {
	return true;
}

function getNativeSide(side: "left" | "right" | "top" | "bottom") {
	if (side === "left" || side === "right") {
		return "top";
	}
	return side;
}
