import { createFileRoute } from "@tanstack/react-router";
import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { IndexOverview } from "@/components/common/index-overview";
import { PanelUserIcon, PanelWarningIcon } from "@/components/icons";

import { useStore } from "zustand";
import { getAlarmOverview } from "@/apis/dashboard/alarm";
import { userStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { formatNumber, formatRate2Percentage } from "@/lib/format";
import AlarmUserTable from "./components/alarm-user-table";

export const Route = createFileRoute("/_authenticated/unit/warnings/")({
	component: RouteComponent,
});

function RouteComponent() {
	const unitId = useStore(userStore, (state) => state.user!.unitId);
	const { data: alarmOverview } = useQuery({
		queryKey: ["unit-warnings-overview", unitId],
		queryFn: () => getAlarmOverview({ unitId: unitId }),
	});
	const datas = [
		{
			title: "当前高风险用户总数",
			value: `${formatNumber(alarmOverview?.total)}人`,
			percentage: formatRate2Percentage(alarmOverview?.totalChange),
			icon: <PanelWarningIcon />,
		},
		{
			title: "待处理高风险用户数",
			value: `${formatNumber(alarmOverview?.pending)}人`,
			percentage: formatRate2Percentage(alarmOverview?.pendingChange),
			icon: <PanelWarningIcon />,
		},
		{
			title: "已处理高风险用户数",
			value: `${formatNumber(alarmOverview?.processed)}人`,
			percentage: formatRate2Percentage(alarmOverview?.processedChange),
			icon: <PanelUserIcon />,
		},
		{
			title: "需追踪用户总数",
			value: `${formatNumber(alarmOverview?.track)}人`,
			percentage: formatRate2Percentage(alarmOverview?.trackChange),
			icon: <PanelUserIcon />,
		},
	];
	return (
		<CardLayout variant="layout" data-theme="danger">
			<div className="flex items-center justify-between">
				<CardHeaderTitle>预警管理</CardHeaderTitle>
				<InputGroup className="w-60">
					<InputGroupInput placeholder="搜索关键数据" />
					<InputGroupAddon align={"inline-end"}>
						<SearchIcon />
					</InputGroupAddon>
				</InputGroup>
			</div>
			<IndexOverview title="核心数据总览" className="mt-8.5" datas={datas} />
			<AlarmUserTable />
		</CardLayout>
	);
}
