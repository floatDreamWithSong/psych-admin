import { createFileRoute } from "@tanstack/react-router";
import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import { Button } from "@/components/ui/button";
import PanelCharts from "@/components/common/charts";
import dayjs from "dayjs";
import malePng from "@/assets/imgs/male.png";
import { cn } from "@/lib/utils";

interface InfoItemProps {
	label: string;
	value: string;
	className?: string;
}

const InfoItem = ({ label, value, className }: InfoItemProps) => {
	return (
		<div>
			<p className="text-sm leading-7.5 text-[#4F4F4F]">{label}：</p>
			<p className={cn("text-lg leading-7.5", className)}>{value}</p>
		</div>
	);
};

export const Route = createFileRoute("/_authenticated/unit/records/")({
	component: RouteComponent,
});

function RouteComponent() {
	const infoItems = [
		{
			label: "姓名",
			value: "张明轩",
		},
		{
			label: "年级",
			value: "七年级",
		},
		{
			label: "风险等级",
			value: "高风险",
			className: "text-destructive font-bold",
		},
		{
			label: "性别",
			value: "男",
		},
		{
			label: "班级",
			value: "一班",
		},
		{
			label: "对话总轮数",
			value: "25",
		},
		{
			label: "年龄",
			value: "14岁",
		},
		{
			label: "学号",
			value: "2023032101",
		},
		{
			label: "上次对话时间",
			value: "2025.10.30 18:45",
		},
	];
	return (
		<CardLayout variant="layout">
			<CardHeaderTitle>对话记录</CardHeaderTitle>
			<CardLayout variant="area" className="mt-6 pb-10.5">
				<CardHeaderTitle variant="light" className="pb-5.5">
					用户信息
				</CardHeaderTitle>
				<article className="h-fit w-full flex flex-wrap gap-15">
					<section className="size-47">
						<img src={malePng} alt="male" width={188} height={188} />
					</section>
					<section className="grid grid-cols-3 w-115">
						{infoItems.map((item) => (
							<InfoItem key={item.label} {...item} />
						))}
					</section>
					<section className="grow">
						<p className="text-sm leading-7.5 text-[#4F4F4F]">
							近一周对话频率趋势：
						</p>
						<PanelCharts.ActivityChart
							type="line"
							borderStyle="none"
							className="h-fit p-0"
							containerClassName="h-38"
							config={{
								value: {
									label: "对话频率",
								},
							}}
							datas={Array.from({ length: 7 }).map((_, index) => ({
								day: `Mon`,
								date: index + 1,
								value: index * 2 + 1,
							}))}
						/>
					</section>
				</article>
			</CardLayout>
			<CardLayout variant="area" className="mt-5">
				<CardHeaderTitle variant="light" className="pb-5.5">
					对话详情
				</CardHeaderTitle>
				<div className="space-y-5.5">
					{Array.from({ length: 3 }).map((_, index) => (
						<DetailCard key={index} />
					))}
				</div>
			</CardLayout>
		</CardLayout>
	);
}

const DetailCard = () => {
	return (
		<CardLayout
			variant="card"
			className="w-full flex flex-wrap gap-20 pt-4 pb-7 pl-6.75 pr-5.5"
		>
			<div className="space-y-1.25 h-fit">
				<p className="text-gradient-1-2 text-lg leading-7.5 font-bold">
					对话时间：{dayjs(new Date()).format("YYYY.MM.DD HH:mm")}
				</p>
				<p className="text-lg leading-7.5">内容摘要：</p>
				<p className="text-[#838383] max-w-165 text-sm">
					张明轩目前面临显著的学习困扰：在数学和英语学科中感到枯燥无力，尽管努力复习但成绩停滞，导致自我怀疑和焦虑情绪；学习时注意力难以集中，计划执行困难，同时因熬夜和睡眠不足形成恶性循环。他既受到“不够努力”等外部评价的压力，也在尝试调整学习方法的过程中感到迷茫，呈现出从被动学习向自主管理过渡阶段的典型挑战。
				</p>
			</div>
			<div>
				<p className="text-lg mb-2 leading-7.5">关键词词云：</p>
				<PanelCharts.WordCloud
					borderStyle="none"
					className="w-86 p-0"
					containerClassName="h-32"
					fontRange={[14, 35]}
					datas={[
						{ text: "焦虑", weight: 8 },
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
					]}
				/>
			</div>
			<div className="grow flex items-end justify-end">
				<Button variant="detail-gradient" size={"larger"}>
					查看详情
				</Button>
			</div>
		</CardLayout>
	);
};
