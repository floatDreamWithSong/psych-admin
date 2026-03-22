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
import { useQuery } from "@tanstack/react-query";
import { getDataOverView } from "@/apis/dashboard/dashboard";

export const Route = createFileRoute("/_authenticated/admin/panel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ["admin-panel-overview"],
		queryFn: () => {
			return getDataOverView({ unitId: "" });
		},
	});
	const datas: React.ComponentProps<typeof IndexOverview>["datas"] = data
		? [
				{
					title: "总注册单位",
					value: data.totalUnits,
					valueUnit: "家",
					percentage: data.weeklyIncreaseUnitsRate,
					icon: <HomeIcon />,
				},
				{
					title: "总用户数",
					value: data.totalUsers,
					valueUnit: "人",
					percentage: data.weeklyIncreaseUsersRate,
					icon: <PanelUserIcon />,
				},
				{
					title: "总对话数",
					value: data.totalConversations,
					valueUnit: "次",
					percentage: data.weeklyIncreaseConversationsRate,
					icon: <MessageIcon />,
				},
				{
					title: "平均单次对话时长",
					value: data.averageTimePerConversation,
					valueUnit: "min",
					percentage: data.weeklyIncreaseAverageTimePerConversationRate,
					icon: <ClockIcon />,
				},
				{
					title: "当前高风险用户数",
					value: data.alarmUsers,
					valueUnit: "人",
					percentage: data.weeklyIncreaseAlarmUsersRate,
					props: {
						"data-theme": "danger",
					},
					icon: <PanelWarningIcon />,
				},
			]
		: [];
	return (
		<AdminPanelLayout>
			<IndexOverview datas={datas} />
			<DepartmentTable />
		</AdminPanelLayout>
	);
}
