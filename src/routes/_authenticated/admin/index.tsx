import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/")({
	beforeLoad: () => {
		throw redirect({ to: "/admin/panel" });
	},
	component: Outlet,
});
