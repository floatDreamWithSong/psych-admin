import { redirect } from "@tanstack/react-router";
import { tokenStore } from "./utils";
import { userStore } from "@/store/user";
import { Role } from "@/apis/common/constant";

const requireRole = (role: Role) => {
	const user = userStore.getState().user;
	if (user?.role !== role) {
		throw redirect({
			to: "/403",
		});
	}
};

const requireAuth = () => {
	const token = tokenStore.get();
	const isAuthenticated = Boolean(token);
	if (!isAuthenticated) {
		throw redirect({
			to: "/sign-in",
		});
	}
};

const requireAdmin = () => requireRole(Role.SUPER_ADMIN);

const requireUnit = () => requireRole(Role.UNIT_ADMIN);

export default { requireRole, requireAuth, requireAdmin, requireUnit };
