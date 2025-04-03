import * as React from "react";
import {
	type PressableStateCallbackType,
	type Image as RNImage,
	type ImageProps as RNImageProps,
	type ImageStyle as RNImageStyle,
	type Pressable as RNPressable,
	type PressableProps as RNPressableProps,
	type Text as RNText,
	type TextProps as RNTextProps,
	type View as RNView,
	type ViewProps as RNViewProps,
	type StyleProp,
	StyleSheet,
} from "react-native";

const Pressable = React.forwardRef<
	React.ElementRef<typeof RNPressable>,
	RNPressableProps
>((props, forwardedRef) => {
	const { children, ...pressableSlotProps } = props;

	if (!React.isValidElement(children)) {
		if (__DEV__) {
			console.log("Slot.Pressable - Invalid asChild element", children);
		}
		return null;
	}

	return React.cloneElement<
		React.ComponentPropsWithoutRef<typeof RNPressable>,
		React.ElementRef<typeof RNPressable>
	>(isTextChildren(children) ? <></> : children, {
		...mergeProps(pressableSlotProps, children.props),
		ref: forwardedRef
			? composeRefs(
					forwardedRef,
					(children.props as React.ComponentPropsWithRef<typeof RNPressable>)
						.ref,
				)
			: (children.props as React.ComponentPropsWithRef<typeof RNPressable>).ref,
	});
});

Pressable.displayName = "SlotPressable";

const View = React.forwardRef<React.ElementRef<typeof RNView>, RNViewProps>(
	(props, forwardedRef) => {
		const { children, ...viewSlotProps } = props;

		if (!React.isValidElement(children)) {
			if (__DEV__) {
				console.log("Slot.View - Invalid asChild element", children);
			}
			return null;
		}

		return React.cloneElement<
			React.ComponentPropsWithoutRef<typeof RNView>,
			React.ElementRef<typeof RNView>
		>(isTextChildren(children) ? <></> : children, {
			...mergeProps(viewSlotProps, children.props),
			ref: forwardedRef
				? composeRefs(
						forwardedRef,
						(children.props as React.ComponentPropsWithRef<typeof RNView>).ref,
					)
				: (children.props as React.ComponentPropsWithRef<typeof RNView>).ref,
		});
	},
);

View.displayName = "SlotView";

const Text = React.forwardRef<React.ElementRef<typeof RNText>, RNTextProps>(
	(props, forwardedRef) => {
		const { children, ...textSlotProps } = props;

		if (!React.isValidElement(children)) {
			if (__DEV__) {
				console.log("Slot.Text - Invalid asChild element", children);
			}
			return null;
		}

		return React.cloneElement<
			React.ComponentPropsWithoutRef<typeof RNText>,
			React.ElementRef<typeof RNText>
		>(isTextChildren(children) ? <></> : children, {
			...mergeProps(textSlotProps, children.props),
			ref: forwardedRef
				? composeRefs(
						forwardedRef,
						(children.props as React.ComponentPropsWithRef<typeof RNText>).ref,
					)
				: (children.props as React.ComponentPropsWithRef<typeof RNText>).ref,
		});
	},
);

Text.displayName = "SlotText";

type ImageSlotProps = RNImageProps & {
	children?: React.ReactNode;
};

const Image = React.forwardRef<
	React.ElementRef<typeof RNImage>,
	ImageSlotProps
>((props, forwardedRef) => {
	const { children, ...imageSlotProps } = props;

	if (!React.isValidElement(children)) {
		if (__DEV__) {
			console.log("Slot.Image - Invalid asChild element", children);
		}
		return null;
	}

	return React.cloneElement<
		React.ComponentPropsWithoutRef<typeof RNImage>,
		React.ElementRef<typeof RNImage>
	>(isTextChildren(children) ? <></> : children, {
		...mergeProps(imageSlotProps, children.props),
		ref: forwardedRef
			? composeRefs(
					forwardedRef,
					(children.props as React.ComponentPropsWithRef<typeof RNImage>).ref,
				)
			: (children.props as React.ComponentPropsWithRef<typeof RNImage>).ref,
	});
});

Image.displayName = "SlotImage";

export { Image, Pressable, Text, View };

function composeRefs<T>(...refs: (React.LegacyRef<T> | undefined)[]) {
	return (node: T) => {
		for (const ref of refs) {
			if (typeof ref === "function") {
				ref(node);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T>).current = node;
			}
		}
	};
}

type AnyProps = Record<string, unknown>;

function handleEventProp(
	propName: string,
	slotPropValue: ((...args: unknown[]) => void) | undefined,
	childPropValue: ((...args: unknown[]) => void) | undefined,
) {
	if (slotPropValue && childPropValue) {
		return (...args: unknown[]) => {
			childPropValue(...args);
			slotPropValue(...args);
		};
	}
	return slotPropValue || childPropValue;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
	const overrideProps = { ...childProps };

	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];

		const isHandler = /^on[A-Z]/.test(propName);
		if (isHandler) {
			overrideProps[propName] = handleEventProp(
				propName,
				slotPropValue as ((...args: unknown[]) => void) | undefined,
				childPropValue as ((...args: unknown[]) => void) | undefined,
			);
		} else if (propName === "style") {
			overrideProps[propName] = combineStyles(
				slotPropValue as Style,
				childPropValue as Style,
			);
		} else if (propName === "className") {
			overrideProps[propName] = [slotPropValue, childPropValue]
				.filter(Boolean)
				.join(" ");
		}
	}

	return { ...slotProps, ...overrideProps };
}

type PressableStyle = RNPressableProps["style"];
type ImageStyle = StyleProp<RNImageStyle>;
type Style = PressableStyle | ImageStyle;

function combineStyles(slotStyle?: Style, childValue?: Style) {
	if (typeof slotStyle === "function" && typeof childValue === "function") {
		return (state: PressableStateCallbackType) => {
			return StyleSheet.flatten([slotStyle(state), childValue(state)]);
		};
	}
	if (typeof slotStyle === "function") {
		return (state: PressableStateCallbackType) => {
			return childValue
				? StyleSheet.flatten([slotStyle(state), childValue])
				: slotStyle(state);
		};
	}
	if (typeof childValue === "function") {
		return (state: PressableStateCallbackType) => {
			return slotStyle
				? StyleSheet.flatten([slotStyle, childValue(state)])
				: childValue(state);
		};
	}

	return StyleSheet.flatten([slotStyle, childValue].filter(Boolean));
}

export function isTextChildren(
	children:
		| React.ReactNode
		| ((state: PressableStateCallbackType) => React.ReactNode),
) {
	return Array.isArray(children)
		? children.every((child) => typeof child === "string")
		: typeof children === "string";
}
