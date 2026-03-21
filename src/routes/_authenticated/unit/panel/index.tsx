import { createFileRoute } from "@tanstack/react-router";
import PanelCharts from "@/components/common/charts";
import type { ChartConfig } from "@/components/ui/chart";
import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import AdminPanelLayout from "@admin/layouts/admin-panel-layout";
import {
	IndexOverview,
	type IndexCardProps,
} from "@/components/common/index-overview";
import {
	ClockIcon,
	HomeIcon,
	MessageIcon,
	PanelUserIcon,
	PanelWarningIcon,
} from "@/components/icons";

export const Route = createFileRoute("/_authenticated/unit/panel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const emotionData = [
		{ name: "危险", value: 8, fill: "var(--pie-1)" },
		{ name: "负面", value: 6.7, fill: "var(--pie-2)" },
		{ name: "中性", value: 55, fill: "var(--pie-3)" },
		{ name: "正向", value: 30.3, fill: "var(--pie-4)" },
	];

	const emotionConfig = emotionData.reduce((acc: ChartConfig, item) => {
		acc[item.name] = { label: item.name, color: item.fill };
		return acc;
	}, {});
	const appDeviceData = [
		{ name: "小程序端", value: 8, fill: "var(--pie-1)" },
		{ name: "APP端", value: 6.7, fill: "var(--pie-2)" },
		{ name: "实体端", value: 55, fill: "var(--pie-3)" },
		{ name: "Web端", value: 30.3, fill: "var(--pie-4)" },
	];
	const appDeviceConfig = appDeviceData.reduce((acc: ChartConfig, item) => {
		acc[item.name] = { label: item.name, color: item.fill };
		return acc;
	}, {});
	const indexCards: IndexCardProps[] = [
		{
			title: "学生总数",
			value: "2210人",
			percentage: 12.5,
			icon: <HomeIcon />,
		},
		{
			title: "活跃用户数",
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
	];
	return (
		<AdminPanelLayout>
			<IndexOverview datas={indexCards} title="指标总览" />
			<CardLayout variant="area">
				<CardHeaderTitle variant="light" className="pb-2.5">
					学生使用趋势
				</CardHeaderTitle>
				<div className="flex gap-6.5 flex-wrap">
					<PanelCharts.ActivityChart
						type="line"
						title="近一周学生活跃趋势"
						config={{
							value: {
								label: "活跃用户",
							},
						}}
						datas={[
							{ day: "Mon", date: 10, value: 320 },
							{ day: "Tues", date: 11, value: 280 },
							{ day: "Wed", date: 12, value: 350 },
							{ day: "Thurs", date: 13, value: 500 },
							{ day: "Fri", date: 14, value: 420 },
							{ day: "Sat", date: 15, value: 180 },
							{ day: "Sun", date: 16, value: 220 },
						]}
					/>
					<PanelCharts.ActivityChart
						type="line"
						title="近一周用户活跃趋势"
						config={{
							value: {
								label: "活跃用户",
							},
						}}
						datas={[
							{ day: "Mon", date: 10, value: 320 },
							{ day: "Tues", date: 11, value: 280 },
							{ day: "Wed", date: 12, value: 350 },
							{ day: "Thurs", date: 13, value: 500 },
							{ day: "Fri", date: 14, value: 420 },
							{ day: "Sat", date: 15, value: 180 },
							{ day: "Sun", date: 16, value: 220 },
						]}
					/>
				</div>
				<div className="flex gap-7 flex-wrap mt-6.25">
					<PanelCharts.ActivityChart
						type="column"
						className="h-73.75 grow-6"
						title="对话时间分布"
						config={{
							value: {
								label: "对话时间",
							},
						}}
						datas={Array.from({ length: 29 }).map((_, index) => ({
							date: index + 1,
							value: index * 2 + 1,
						}))}
					/>

					<PanelCharts.CommonPieChart
						className="h-73.75 grow-4"
						title="使用平台设备类型占比"
						datas={appDeviceData}
						config={appDeviceConfig}
					/>
				</div>
			</CardLayout>
			<CardLayout variant="area">
				<CardHeaderTitle variant="light">情绪与心理健康趋势</CardHeaderTitle>
				<div className="flex gap-5 flex-wrap mt-6">
					<PanelCharts.CommonPieChart
						title="情绪分布图"
						datas={emotionData}
						config={emotionConfig}
					/>
					<PanelCharts.RiskLevelChart
						title="风险等级分布图"
						datas={[
							{ level: "危险", female: 80, male: 60 },
							{ level: "负面", female: 150, male: 120 },
							{ level: "中性", female: 300, male: 280 },
							{ level: "正向", female: 500, male: 450 },
						]}
						config={{
							female: { label: "女性", color: "var(--gradient-2)" },
							male: { label: "男性", color: "var(--gradient-1)" },
						}}
					/>
					<PanelCharts.WordCloud
						datas={[
							{ text: "焦虑", weight: 10 },
							{ text: "挫败", weight: 9 },
							{ text: "受伤", weight: 7 },
							{ text: "忧郁", weight: 7 },
							{ text: "生活", weight: 6 },
							{ text: "考试", weight: 8 },
							{ text: "自杀", weight: 5 },
							{ text: "孤单", weight: 5 },
							{ text: "伤心", weight: 5 },
							{ text: "责骂", weight: 6 },
							{ text: "忽视", weight: 6 },
							{ text: "霸凌", weight: 5 },
							{ text: "冷落", weight: 4 },
							{ text: "怒放", weight: 4 },
							{ text: "落落", weight: 4 },
						]}
						title="关键词云图"
					/>
				</div>
			</CardLayout>
		</AdminPanelLayout>
	);
}
