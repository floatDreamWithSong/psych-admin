import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/unit/")({
	beforeLoad: () => {
		throw redirect({ to: "/unit/panel" });
	},
	component: Outlet,
});
