import * as React from "react";
import { cn } from "~/lib/utils";
import { Fallback, Image, Root } from "./primitive";
import type {
	FallbackProps,
	FallbackRef,
	ImageProps,
	ImageRef,
	RootProps,
	RootRef,
} from "./types";

const AvatarPrimitiveRoot = Root;
const AvatarPrimitiveImage = Image;
const AvatarPrimitiveFallback = Fallback;

const Avatar = React.forwardRef<RootRef, RootProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitiveRoot
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
				className,
			)}
			{...props}
		/>
	),
);
Avatar.displayName = AvatarPrimitiveRoot.displayName;

const AvatarImage = React.forwardRef<ImageRef, ImageProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitiveImage
			ref={ref}
			className={cn("aspect-square h-full w-full", className)}
			{...props}
		/>
	),
);
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

const AvatarFallback = React.forwardRef<FallbackRef, FallbackProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitiveFallback
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full bg-muted",
				className,
			)}
			{...props}
		/>
	),
);
AvatarFallback.displayName = AvatarPrimitiveFallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
