import { Role } from "@/apis/common/constant";
import { userStore } from "@/store/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
	beforeLoad: () => {
		const user = userStore.getState().user;
		if (!user?.role) {
			throw redirect({
				to: "/sign-in",
			});
		}
		if (user?.role === Role.SUPER_ADMIN) {
			throw redirect({
				to: "/admin",
			});
		} else {
			throw redirect({
				to: "/unit",
			});
		}
	},
	component: Outlet,
});
