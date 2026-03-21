import { createFileRoute } from "@tanstack/react-router";
import type { ChartConfig } from "@/components/ui/chart";
import PanelCharts from "@/components/common/charts";
import AdminPanelLayout from "../../layouts/admin-panel-layout";

export const Route = createFileRoute("/_authenticated/admin/panel/detail/$id")({
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
	return (
		<AdminPanelLayout>
			<div className="flex flex-col gap-5">
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
				<div className="flex gap-5 flex-wrap">
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
			</div>
		</AdminPanelLayout>
	);
}
