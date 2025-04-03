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

const Avatar = React.forwardRef<RootRef, RootProps>(
	({ alt, className, ...props }, ref) => {
		return (
			<Root
				ref={ref}
				alt={alt}
				className={cn(
					"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
					className,
				)}
				{...props}
			/>
		);
	},
);

Avatar.displayName = Root.displayName;

const AvatarImage = React.forwardRef<ImageRef, ImageProps>(
	({ className, ...props }, ref) => {
		return (
			<Image
				ref={ref}
				className={cn("aspect-square h-full w-full", className)}
				{...props}
			/>
		);
	},
);

AvatarImage.displayName = Image.displayName;

const AvatarFallback = React.forwardRef<FallbackRef, FallbackProps>(
	({ className, ...props }, ref) => {
		return (
			<Fallback
				ref={ref}
				className={cn(
					"bg-muted flex h-full w-full items-center justify-center rounded-full",
					className,
				)}
				{...props}
			/>
		);
	},
);

AvatarFallback.displayName = Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
