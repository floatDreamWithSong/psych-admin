import { createFileRoute } from "@tanstack/react-router";
import DepartmentTable from "@admin/components/department-table";
import {
	ClockIcon,
	HomeIcon,
	MessageIcon,
	PanelUserIcon,
	PanelWarningIcon,
} from "@/components/icons";
import { IndexOverview } from "@/components/common/index-overview";
import AdminPanelLayout from "@admin/layouts/admin-panel-layout";

export const Route = createFileRoute("/_authenticated/admin/panel/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AdminPanelLayout>
			<IndexOverview
				datas={[
					{
						title: "总注册单位",
						value: "1000家",
						percentage: 10,
						icon: <HomeIcon />,
					},
					{
						title: "总用户数",
						value: "1000人",
						percentage: 10,
						icon: <PanelUserIcon />,
					},
					{
						title: "总对话数",
						value: "21w次",
						percentage: 10,
						icon: <MessageIcon />,
					},
					{
						title: "平均单次对话时长",
						value: "55min",
						percentage: -10,
						icon: <ClockIcon />,
					},
					{
						title: "当前高风险用户数",
						value: "1000人",
						percentage: 10,
						props: {
							"data-theme": "danger",
						},
						icon: <PanelWarningIcon />,
					},
				]}
			/>
			<DepartmentTable />
		</AdminPanelLayout>
	);
}
