import { cn } from "@/lib/utils";
import { Outlet } from "@tanstack/react-router";

const DashboardLayout = ({
	children,
	className,
	sidebar,
	...props
}: React.ComponentProps<"div"> & { sidebar: React.ReactNode }) => {
	return (
		<div
			{...props}
			className={cn("flex w-full h-full bg-[#FAFCFF]", className)}
		>
			<div className="w-30 shrink-0">{sidebar}</div>
			<div className="flex-1 min-w-0 p-5 pl-0">
				<div className="bg-white rounded-xl w-full h-full overflow-y-auto overflow-x-hidden scroll-hidden overflow-gradient">
					{children || <Outlet />}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
