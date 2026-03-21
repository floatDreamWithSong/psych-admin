import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	Sector,
	XAxis,
	YAxis,
} from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { CardLayout } from "@layouts/card-layout";
import { useId, useRef, useEffect, useState } from "react";
import cloud from "d3-cloud";
import { scaleLinear } from "d3-scale";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ChartProps = React.ComponentProps<typeof CardLayout> & {
	containerClassName?: string;
};

// ==================== 近一周用户活跃趋势 ====================

type ActivityChartProps = {
	config: ChartConfig;
	title?: string;
	borderStyle?: "squre-border" | "none";
	drawYAxis?: boolean;
	xAxisPosition?: "top" | "bottom";
	drawCartesianGrid?: "horizontal" | "vertical" | "both" | "none";
} & (
	| {
			datas: {
				day: string;
				date: number | string;
				value: number;
			}[];
			type: "line";
	  }
	| {
			datas: {
				date: number;
				value: number;
			}[];
			type: "column";
	  }
);

function ActivityChart(props: ActivityChartProps & ChartProps) {
	const {
		datas,
		config,
		title,
		type,
		className,
		containerClassName,
		borderStyle = "squre-border",
		drawYAxis = false,
		xAxisPosition = "top",
		drawCartesianGrid = "vertical",
		...rest
	} = props;
	const id = useId();
	return (
		<CardLayout
			className={cn(
				"px-6 py-5  flex-1",
				borderStyle === "squre-border" && "squre-border",
				className,
			)}
			{...rest}
		>
			{title && <p className="text-base font-medium mb-4">{title}</p>}
			<ChartContainer
				config={config}
				className={cn("h-50 w-full", containerClassName)}
			>
				{type === "line" ? (
					<AreaChart
						data={datas}
						margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
					>
						<defs>
							<linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="0%"
									stopColor="var(--gradient-2)"
									stopOpacity={1}
								/>
								<stop
									offset="100%"
									stopColor="var(--gradient-2)"
									stopOpacity={0.02}
								/>
							</linearGradient>
						</defs>
						{drawCartesianGrid && (
							<CartesianGrid
								vertical={
									drawCartesianGrid === "vertical" ||
									drawCartesianGrid === "both"
								}
								horizontal={
									drawCartesianGrid === "horizontal" ||
									drawCartesianGrid === "both"
								}
								strokeDasharray="3 3"
								stroke="#F0F0F0"
							/>
						)}
						<XAxis
							dataKey="day"
							orientation={xAxisPosition}
							axisLine={false}
							tickLine={false}
							tick={({ x, y, payload }) => {
								const item = datas.find((d) => d.day === payload.value);
								return (
									<g
										transform={`translate(${x},${xAxisPosition === "top" ? 0 : y})`}
									>
										<text
											x={0}
											y={0}
											dy={12}
											textAnchor="middle"
											fill="#999"
											fontSize={12}
										>
											{payload.value}
										</text>
										<text
											x={0}
											y={0}
											dy={26}
											textAnchor="middle"
											fill="#000"
											fontSize={11}
										>
											{item?.date}
										</text>
									</g>
								);
							}}
							height={40}
						/>
						{drawYAxis && (
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 12, fill: "#999" }}
							/>
						)}
						<ChartTooltip content={<ChartTooltipContent />} />
						<Area
							type="monotone"
							dataKey="value"
							stroke="var(--gradient-2)"
							strokeWidth={2}
							fill={`url(#${id})`}
							dot={false}
						/>
					</AreaChart>
				) : (
					<BarChart
						data={datas}
						margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
					>
						<defs>
							<linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="var(--bar-1)" />
								<stop offset="73%" stopColor="var(--bar-2)" />
								<stop offset="100%" stopColor="var(--bar-3)" />
							</linearGradient>
						</defs>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							stroke="#F0F0F0"
						/>
						<XAxis
							dataKey="date"
							orientation={xAxisPosition}
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: "#999" }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: "#999" }}
							unit="min"
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Bar
							dataKey="value"
							radius={[10, 10, 10, 10]}
							barSize={10}
							fill={`url(#${id}-bar)`}
						/>
					</BarChart>
				)}
			</ChartContainer>
		</CardLayout>
	);
}

// ==================== 情绪分布图 ====================

interface EmotionPieChartProps {
	datas: {
		name: string;
		value: number;
		fill: string;
	}[];
	config: ChartConfig;
	title?: string;
}
function CommonPieChart(props: EmotionPieChartProps & ChartProps) {
	const { datas, config, title, className, containerClassName, ...rest } =
		props;
	return (
		<CardLayout
			className={cn("px-6 py-5 squre-border flex-1 min-w-85", className)}
			{...rest}
		>
			{title && <p className="text-base font-medium mb-2">{title}</p>}
			<div className="flex items-center gap-4">
				<div className="flex flex-col gap-2 min-w-fit">
					{datas.map((item) => (
						<div key={item.name} className="flex items-center gap-2 text-xs">
							<span
								className="inline-block size-2.5 rounded-full"
								style={{ backgroundColor: item.fill }}
							/>
							<span>{item.name}</span>
						</div>
					))}
				</div>
				<ChartContainer
					config={config}
					className={cn("h-45 flex-1", containerClassName)}
				>
					<PieChart>
						<ChartTooltip
							content={
								<ChartTooltipContent
									formatter={(value, name) => (
										<>
											<span className="text-muted-foreground">{name}: </span>
											<span className="font-medium">人数占比{value}%</span>
										</>
									)}
								/>
							}
						/>
						<Pie
							data={datas}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							innerRadius={45}
							outerRadius={70}
							strokeWidth={2}
							stroke="#fff"
							isAnimationActive
							animationDuration={600}
							animationEasing="ease-out"
							activeShape={({
								outerRadius = 0,
								...props
							}: PieSectorDataItem) => (
								<Sector {...props} outerRadius={outerRadius + 8} />
							)}
						>
							{datas.map((entry) => (
								<Cell key={entry.name} fill={entry.fill} />
							))}
						</Pie>
					</PieChart>
				</ChartContainer>
			</div>
		</CardLayout>
	);
}

// ==================== 风险等级统计 ====================

interface RiskLevelChartProps {
	title?: string;
	config: ChartConfig;
	datas: {
		level: string;
		female: number;
		male: number;
	}[];
}

function RiskLevelChart(props: RiskLevelChartProps & ChartProps) {
	const { datas, config, title, className, containerClassName, ...rest } =
		props;
	return (
		<CardLayout
			className={cn("px-6 py-5 squre-border flex-1 min-w-60", className)}
			{...rest}
		>
			<div className="flex items-center justify-between mb-2">
				{title && <p className="text-base font-medium">{title}</p>}
				<div className="flex items-center gap-3">
					{Object.entries(config).map(([key, cfg]) => (
						<div key={key} className="flex items-center gap-1.5 text-xs">
							<span
								className="inline-block size-2.5 rounded-full"
								style={{ backgroundColor: cfg.color }}
							/>
							<span>{cfg.label}</span>
						</div>
					))}
				</div>
			</div>
			<ChartContainer
				config={config}
				className={cn("h-[180px] w-full", containerClassName)}
			>
				<BarChart
					data={datas}
					margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
				>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						stroke="#F0F0F0"
					/>
					<XAxis
						dataKey="level"
						axisLine={false}
						tickLine={false}
						tick={{ fontSize: 12, fill: "#000" }}
					/>
					<YAxis
						axisLine={false}
						tickLine={false}
						tick={{ fontSize: 12, fill: "#999" }}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar
						dataKey="female"
						fill="var(--gradient-2)"
						radius={[3, 3, 0, 0]}
						barSize={16}
					/>
					<Bar
						dataKey="male"
						fill="var(--gradient-1)"
						radius={[3, 3, 0, 0]}
						barSize={16}
					/>
				</BarChart>
			</ChartContainer>
		</CardLayout>
	);
}

// ==================== 风险关键词云 ====================

interface WordCloudProps {
	title?: string;
	datas: {
		text: string;
		weight: number;
	}[];
	borderStyle?: "squre-border" | "none";
	fontRange?: [number, number];
}

type LayoutWord = cloud.Word & { text: string; weight: number; color: string };

function WordCloud(props: WordCloudProps & ChartProps) {
	const {
		datas,
		title,
		className,
		borderStyle = "squre-border",
		containerClassName,
		fontRange = [18, 50],
		...rest
	} = props;
	const { theme } = useTheme();
	const containerRef = useRef<HTMLDivElement>(null);
	const [layoutWords, setLayoutWords] = useState<LayoutWord[]>([]);
	const [size, setSize] = useState<[number, number]>([0, 0]);

	const weights = datas.map((d) => d.weight);
	const minW = Math.min(...weights);
	const maxW = Math.max(...weights);

	const fontScale = scaleLinear().domain([minW, maxW]).range(fontRange);
	const colorScale = (value: number): string => {
		const getCSSVariable = (varName: string) =>
			getComputedStyle(document.documentElement).getPropertyValue(varName);

		// 将十六进制颜色转换为 RGB
		const hexToRgb = (hex: string): [number, number, number] => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result
				? [
						parseInt(result[1], 16),
						parseInt(result[2], 16),
						parseInt(result[3], 16),
					]
				: [134, 134, 255]; // 默认值
		};
		const color1 = getCSSVariable("--gradient-2");
		const color2 = getCSSVariable("--gradient-1");
		const rgb1 = hexToRgb(color1);
		const rgb2 = hexToRgb(color2);
		const t = (value - minW) / (maxW - minW);
		const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * t);
		const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * t);
		const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * t);
		return `rgb(${r}, ${g}, ${b})`;
	};

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const runLayout = (width: number, height: number) => {
			if (width === 0 || height === 0 || datas.length === 0) return;

			const words: LayoutWord[] = datas.map((d) => ({
				text: d.text,
				weight: d.weight,
				size: fontScale(d.weight),
				color: colorScale(d.weight),
			}));

			cloud<LayoutWord>()
				.size([width, height])
				.words(words)
				.padding(4)
				.rotate(0)
				.fontSize((d) => d.size ?? 14)
				.spiral("archimedean")
				.random(() => 0.5)
				.on("end", (tags) => setLayoutWords(tags))
				.start();
		};
		const observer = new ResizeObserver((entries) => {
			const { width, height } = entries[0].contentRect;
			setSize([width, height]);
			runLayout(width, height);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [theme]);

	return (
		<CardLayout
			className={cn(
				"px-6 py-5 flex-1 min-w-60",
				borderStyle === "squre-border" && "squre-border",
				className,
			)}
			{...rest}
		>
			{title && <p className="text-base font-medium mb-2">{title}</p>}
			<div ref={containerRef} className={cn("h-45 w-full", containerClassName)}>
				{size[0] > 0 && (
					<svg width={size[0]} height={size[1]}>
						<g transform={`translate(${size[0] / 2},${size[1] / 2})`}>
							{layoutWords.map((w) => (
								<text
									key={w.text}
									textAnchor="middle"
									className="transition-opacity hover:opacity-70 cursor-default select-none font-semibold"
									style={{
										fontSize: `${w.size}px`,
										fill: w.color,
									}}
									transform={`translate(${w.x},${w.y})`}
								>
									{w.text}
								</text>
							))}
						</g>
					</svg>
				)}
			</div>
		</CardLayout>
	);
}

const PanelCharts = {
	ActivityChart,
	CommonPieChart,
	RiskLevelChart,
	WordCloud,
};

export default PanelCharts;
