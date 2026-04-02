import { createFileRoute } from "@tanstack/react-router";
import type { ChartConfig } from "@/components/ui/chart";
import PanelCharts from "@/components/common/charts";
import AdminPanelLayout from "@admin/layouts/admin-panel-layout";
import { useQuery } from "@tanstack/react-query";
import { getDataTrend, getPsychTrend } from "@/apis/dashboard/dashboard";
import { formatWeek } from "@/lib/format";
import { Emotion, RiskGender, RiskLevelLabel } from "@/apis/common/constant";

export const Route = createFileRoute("/_authenticated/admin/panel/$id")({
	component: RouteComponent,
});

const emotionKey = new Map<string, string>([
	[Emotion.DANGER.toString(), "危险"],
	[Emotion.DEPRESS.toString(), "负面"],
	[Emotion.NEGATIVE.toString(), "中性"],
	[Emotion.NORMAL.toString(), "正向"],
]);

const emotionFill = new Map<string, string>([
	[Emotion.DANGER.toString(), "var(--pie-1)"],
	[Emotion.DEPRESS.toString(), "var(--pie-2)"],
	[Emotion.NEGATIVE.toString(), "var(--pie-3)"],
	[Emotion.NORMAL.toString(), "var(--pie-4)"],
]);

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: dataPsychTrend, isPending: isPendingPsychTrend } = useQuery({
		queryKey: ["admin-unit-detail-psych_trend", id],
		queryFn: () => getPsychTrend({ unitId: id }),
	});
	const { data: dataTrend } = useQuery({
		queryKey: ["admin-unit-detail-data_trend", id],
		queryFn: () => getDataTrend({ unitId: id }),
	});
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

	const riskLevelData = Array.from(
		(dataPsychTrend?.risks || [])
			.reduce((acc, item) => {
				const level = RiskLevelLabel[item.level];
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
			<div className="flex flex-col gap-5">
				<PanelCharts.ActivityChart
					type="line"
					title="近一周用户活跃趋势"
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
				{!isPendingPsychTrend && (
					<div className="flex gap-5 flex-wrap">
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
				)}
			</div>
		</AdminPanelLayout>
	);
}
