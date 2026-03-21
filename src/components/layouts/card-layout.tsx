import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export const CardHeaderTitle = ({
	variant = "primary",
	children,
	className,
	...props
}: {
	variant?: "primary" | "secondary" | "light";
} & React.ComponentProps<"div">) => {
	return (
		<div
			{...props}
			className={cn(
				variant === "primary" && "text-2xl font-medium",
				variant === "secondary" && "text-base font-normal ",
				variant === "light" && "text-lg font-normal text-[#4F4F4F]",
				className,
			)}
		>
			{children}
		</div>
	);
};

export const CardLayout = ({
	className,
	children,
	variant,
	asChild,
	...props
}: {
	header?: React.ReactNode;
} & React.ComponentProps<"div"> & {
		variant?: "layout" | "area" | "card";
		asChild?: boolean;
	}) => {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			{...props}
			className={cn([
				"bg-card w-full h-fit",
				variant === "layout" && "pl-10 pr-6 py-9 mb-10",
				variant === "area" && "px-7.5 py-3.75 round-shadow",
				variant === "card" && "px-7 py-5 squre-border flex min-w-78 w-fit",
				className,
			])}
		>
			{children}
		</Comp>
	);
};
