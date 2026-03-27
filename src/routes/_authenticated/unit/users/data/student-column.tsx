import { Gender, GenderLabel, RiskLevel } from "@/apis/common/constant";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { EyeIcon, PencilLineIcon } from "lucide-react";

export type StudentUserRow = {
	id: string;
	userCode: string;
	userName: string;
	gender: Gender;
	gradeClass: string;
	level: number;
	keywords: string[];
	totalConversationRounds: number;
	lastConversationTime: number;
};

const riskLevelLabelMap = new Map<number, string>([
	[RiskLevel.NORMAL, "正常"],
	[RiskLevel.LOW, "低风险"],
	[RiskLevel.MEDIUM, "中风险"],
	[RiskLevel.HIGH, "高风险"],
]);

const riskLevelClassMap = new Map<number, string>([
	[RiskLevel.NORMAL, "bg-[#96C0FF]"],
	[RiskLevel.LOW, "bg-[#9E9EFF]"],
	[RiskLevel.MEDIUM, "bg-[#8686FF]"],
	[RiskLevel.HIGH, "bg-[#F33838]"],
]);

export const StudentColumns: Array<ColumnDef<StudentUserRow>> = [
	{
		accessorKey: "level",
		header: "风险等级",
		cell: ({ row }) => {
			const level = row.original.level;
			return (
				<span
					className={cn(
						"inline-flex min-w-14 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
						riskLevelClassMap.get(level),
					)}
				>
					{riskLevelLabelMap.get(level) || `等级${level}`}
				</span>
			);
		},
	},
	{
		accessorKey: "userCode",
		header: "学号",
		cell: ({ row }) => <span>{row.original.userCode || "--"}</span>,
	},
	{
		accessorKey: "userName",
		header: "姓名",
		cell: ({ row }) => <span>{row.original.userName || "--"}</span>,
	},
	{
		accessorKey: "gender",
		header: "性别",
		cell: ({ row }) => (
			<span>{GenderLabel[row.original.gender] || "未知"}</span>
		),
	},
	{
		accessorKey: "gradeClass",
		header: "班级",
		cell: ({ row }) => <span>{row.original.gradeClass}</span>,
	},
	{
		accessorKey: "totalConversationRounds",
		header: "总对话轮数",
		cell: ({ row }) => <span>{row.original.totalConversationRounds}</span>,
	},
	{
		accessorKey: "lastConversationTime",
		header: "上次对话时间",
		cell: ({ row }) => (
			<span>
				{row.original.lastConversationTime > 0
					? dayjs
							.unix(row.original.lastConversationTime)
							.format("YYYY-MM-DD HH:mm")
					: "--"}
			</span>
		),
	},
	{
		accessorKey: "keywords",
		header: "近期关键词",
		cell: ({ row }) => (
			<span className="line-clamp-1 max-w-56 text-destructive">
				{row.original.keywords.length > 0
					? row.original.keywords.join("、")
					: "--"}
			</span>
		),
	},
	{
		accessorKey: "actions",
		header: "操作",
		cell: ({ row }) => (
			<>
				<Button variant="link" asChild>
					<Link to="/unit/users/$id" params={{ id: row.original.id }}>
						<EyeIcon className="size-4" />
						查看详情
					</Link>
				</Button>
				<Button variant="ghost">
					<PencilLineIcon className="size-3.5" />
					添加备注
				</Button>
			</>
		),
	},
];
