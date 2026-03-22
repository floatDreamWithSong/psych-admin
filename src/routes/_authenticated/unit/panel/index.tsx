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
import { useStore } from "zustand";
import { userStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import {
	getDataOverView,
	getDataTrend,
	getPsychTrend,
} from "@/apis/dashboard/dashboard";
import { formatWeek } from "@/lib/format";
import { Emotion, RiskGender, RiskLevel } from "@/apis/common/constant";

export const Route = createFileRoute("/_authenticated/unit/panel/")({
	component: RouteComponent,
});

const emotionKey = new Map<string, string>([
	[Emotion.DANGER, "危险"],
	[Emotion.DEPRESS, "负面"],
	[Emotion.NEGATIVE, "中性"],
	[Emotion.NORMAL, "正向"],
]);

const emotionFill = new Map<string, string>([
	[Emotion.DANGER, "var(--pie-1)"],
	[Emotion.DEPRESS, "var(--pie-2)"],
	[Emotion.NEGATIVE, "var(--pie-3)"],
	[Emotion.NORMAL, "var(--pie-4)"],
]);

const riskLevelKey = new Map<RiskLevel, string>([
	[RiskLevel.NORMAL, "正常"],
	[RiskLevel.LOW, "低"],
	[RiskLevel.MEDIUM, "中"],
	[RiskLevel.HIGH, "高"],
]);

function RouteComponent() {
	const unitId = useStore(userStore, (state) => state.user!.unitId);
	const { data: dataOverview } = useQuery({
		queryKey: ["unit-panel-overview", unitId],
		queryFn: () => getDataOverView({ unitId }),
	});
	const { data: dataTrend } = useQuery({
		queryKey: ["unit-panel-data_trend", unitId],
		queryFn: () => getDataTrend({ unitId }),
	});
	const { data: dataPsychTrend, isPending: isPendingPsychTrend } = useQuery({
		queryKey: ["unit-panel-psych_trend", unitId],
		queryFn: () => getPsychTrend({ unitId }),
	});

	const indexCards: IndexCardProps[] = dataOverview
		? [
				{
					title: "学生总数",
					value: dataOverview.totalUsers,
					valueUnit: "人",
					percentage: dataOverview.weeklyIncreaseUsersRate,
					icon: <HomeIcon />,
				},
				{
					title: "活跃用户数",
					value: dataOverview.activeUsers,
					valueUnit: "人",
					percentage: dataOverview.weeklyIncreaseActiveUsersRate,
					icon: <PanelUserIcon />,
				},
				{
					title: "总对话数",
					value: dataOverview.totalConversations,
					valueUnit: "次",
					percentage: dataOverview.weeklyIncreaseConversationsRate,
					icon: <MessageIcon />,
				},
				{
					title: "平均单次对话时长",
					value: dataOverview.averageTimePerConversation,
					valueUnit: "min",
					percentage: dataOverview.weeklyIncreaseAverageTimePerConversationRate,
					icon: <ClockIcon />,
				},
				{
					title: "当前高风险用户数",
					value: dataOverview.alarmUsers,
					valueUnit: "人",
					percentage: dataOverview.weeklyIncreaseAlarmUsersRate,
					props: {
						"data-theme": "danger",
					},
					icon: <PanelWarningIcon />,
				},
			]
		: [];

	const emotionData = Object.entries(
		dataPsychTrend?.emotionRatio.ratio || {},
	).map(([name, value]) => ({
		name: emotionKey.get(name) || name,
		value,
		fill: emotionFill.get(name) || "var(--pie-1)",
	}));

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

	const riskLevelData = Array.from(
		(dataPsychTrend?.risks || [])
			.reduce((acc, item) => {
				const level = riskLevelKey.get(item.level) || String(item.level);
				const current = acc.get(level) || { level, female: 0, male: 0 };

				if (item.gender === RiskGender.ALL) {
					current.female += item.count;
					current.male += item.count;
				} else if (item.gender === RiskGender.FEMALE) {
					current.female += item.count;
				} else if (item.gender === RiskGender.MALE) {
					current.male += item.count;
				}

				acc.set(level, current);
				return acc;
			}, new Map<string, { level: string; female: number; male: number }>())
			.values(),
	);

	const keywordData = Object.entries(
		dataPsychTrend?.keywords.keywordMap || {},
	).map(([name, value]) => ({
		text: name,
		weight: value,
	}));

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
						datas={
							dataTrend?.activePoints.map((item) => ({
								day: formatWeek(item.week),
								date: item.hour,
								value: item.count,
							})) || []
						}
					/>
					<PanelCharts.ActivityChart
						type="line"
						title="近一周对话频率趋势"
						config={{
							value: {
								label: "对话频率",
							},
						}}
						datas={
							dataTrend?.conversationPoints.map((item) => ({
								day: formatWeek(item.week),
								date: item.hour,
								value: item.count,
							})) || []
						}
					/>
				</div>
				<div className="flex gap-7 flex-wrap mt-6.25">
					<PanelCharts.ActivityChart
						type="column"
						className="h-73.75 grow-6"
						title="对话时间分布"
						config={{
							value: {
								label: "对话次数",
							},
						}}
						yAxisUnit="min"
						xAxisPosition="bottom"
						datas={
							dataTrend?.conversationDurations.map((item) => ({
								date: item.minutes,
								value: item.count,
							})) || []
						}
					/>
					{/* TODO: 后端暂未实现该功能，先留着不动 */}
					<PanelCharts.CommonPieChart
						className="h-73.75 grow-4"
						title="使用平台设备类型占比"
						datas={appDeviceData}
						config={appDeviceConfig}
					/>
				</div>
			</CardLayout>
			{!isPendingPsychTrend && (
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
							datas={riskLevelData}
							config={{
								female: { label: "女性", color: "var(--gradient-2)" },
								male: { label: "男性", color: "var(--gradient-1)" },
							}}
						/>
						<PanelCharts.WordCloud datas={keywordData} title="关键词云图" />
					</div>
				</CardLayout>
			)}
		</AdminPanelLayout>
	);
}
