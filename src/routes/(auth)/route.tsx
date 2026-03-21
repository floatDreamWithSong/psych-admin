import Logo from "@/components/icons/logo";
import { env } from "@/env";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div>
				<section className="flex gap-4 items-center justify-center">
					<Logo />
					<h1 className="text-3xl">{env.VITE_APP_TITLE}</h1>
				</section>
				<section className="mt-10 w-80">
					<Outlet />
				</section>
			</div>
		</div>
	);
}
