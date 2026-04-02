import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";
import type React from "react";

interface LinkItemI {
	icon: (
		props: React.ComponentProps<"svg"> & { isActive?: boolean },
	) => React.JSX.Element;
	label: string;
	href: LinkProps["to"];
}

const SidebarLink = ({
	icon,
	label,
	href,
	...props
}: LinkItemI & Omit<React.ComponentProps<typeof Link>, "to" | "children">) => {
	const Icon = icon;
	return (
		<Link
			to={href}
			{...props}
			className="w-full"
			activeProps={{
				className: "w-full",
			}}
		>
			{({ isActive }) => (
				<Button
					variant="ghost"
					className={cn([
						"w-full flex flex-col items-center justify-center h-19 rounded-none relative cursor-pointer",
						isActive && "bg-white",
					])}
				>
					{isActive && (
						<div className="from-gradient-1 to-gradient-2 bg-linear-to-b w-1 h-full absolute top-0 left-0" />
					)}
					<Icon isActive={isActive} className="size-6" />
					{label}
				</Button>
			)}
		</Link>
	);
};

export const SidebarLayout = ({
	head,
	links,
	footer,
}: {
	head: React.ReactNode;
	links: LinkItemI[];
	footer: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col h-full justify-between items-center [&>div]:w-full [&>div]:flex [&>div]:flex-col [&>div]:items-center">
			<div className="shrink-0 py-10">{head}</div>
			<div className="flex-1">
				{links.map((link) => (
					<SidebarLink key={link.href} {...link} />
				))}
			</div>
			<div className="shrink-0 py-10">{footer}</div>
		</div>
	);
};
