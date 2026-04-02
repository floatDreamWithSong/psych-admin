import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import DashboardLayout from "@/components/layouts/dashboard";
import Header from "@/components/layouts/header";
import { SidebarLayout } from "@/components/layouts/sidebar";
import { useStore } from "zustand";
import {
	PanelIcon,
	RecordIcon,
	SetttingIcon,
	SidebarAlertIcon,
	SidebarUserIcon,
} from "@/components/icons";

import Footer from "@layouts/footer";
import { userStore } from "@/store/user";
import { Role } from "@/apis/common/constant";
import { tokenStore } from "@/lib/utils";
import PanelOutlineIcon from "@/components/icons/sidebar/panel-outline";
import UserOutlineIcon from "@/components/icons/sidebar/user-outline";
import AlertFillIcon from "@/components/icons/sidebar/alert-fill";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: () => {
		if (!Boolean(tokenStore.get())) {
			throw redirect({
				to: "/sign-in",
			});
		}
		const user = userStore.getState().user;
		if (!user?.role) {
			throw redirect({
				to: "/sign-in",
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const userRole = useStore(userStore, (state) => state.user?.role);
	return (
		<DashboardLayout
			sidebar={
				<SidebarLayout
					head={<Header />}
					links={
						userRole === Role.SUPER_ADMIN
							? [
									{
										icon: ({ isActive, ...props }) =>
											isActive ? (
												<PanelIcon {...props} />
											) : (
												<PanelOutlineIcon {...props} />
											),
										label: "数据看板",
										href: "/admin/panel",
									},
								]
							: [
									{
										icon: ({ isActive, ...props }) =>
											isActive ? (
												<PanelIcon {...props} />
											) : (
												<PanelOutlineIcon {...props} />
											),
										label: "数据看板",
										href: "/unit/panel",
									},
									{
										icon: ({ isActive, ...props }) =>
											isActive ? (
												<AlertFillIcon {...props} />
											) : (
												<SidebarAlertIcon {...props} />
											),
										label: "预警管理",
										href: "/unit/warnings",
									},
									{
										icon: ({ isActive, ...props }) =>
											isActive ? (
												<SidebarUserIcon {...props} />
											) : (
												<UserOutlineIcon {...props} />
											),
										label: "用户管理",
										href: "/unit/users",
									},
									{
										icon: RecordIcon,
										label: "对话记录",
										href: "/unit/records",
									},
									{
										icon: SetttingIcon,
										label: "系统设置",
										href: "/unit/settings",
									},
								]
					}
					footer={<Footer />}
				/>
			}
		>
			<Outlet />
		</DashboardLayout>
	);
}
