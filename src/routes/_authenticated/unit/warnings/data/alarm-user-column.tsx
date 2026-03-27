// import { AlarmStudentStatus } from "@/apis/common/constant";
import type { UserRemark } from "@/apis/common/type";
import { StudentRemarkAction } from "@/components/features/user-remark-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";

export interface AlarmUserRow {
	id: string;
	emotion: string;
	userName: string;
	userCode: string;
	gradeClass: string;
	keywords: string[];
	totalConversationRounds: number;
	lastConversationTime: number;
	remark?: UserRemark | null;
	// TODO: 等后端给出枚举值
	status: string;
}

const emotionLabelMap = new Map<string, string>([
	["1", "危险"],
	["2", "负面"],
	["3", "中性"],
	["4", "正向"],
]);

const statusLabelMap = new Map<string, string>([
	["pending", "待处理"],
	["processed", "已处理"],
	["track", "需追踪"],
]);

export const alarmUserColumns: Array<ColumnDef<AlarmUserRow>> = [
	{
		accessorKey: "emotion",
		header: "情绪类型",
		cell: ({ row }) => {
			const emotion = row.original.emotion;
			return (
				<span
					className={cn(
						"inline-flex min-w-14 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white bg-destructive/70",
					)}
				>
					{emotionLabelMap.get(emotion) || emotion}
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
		cell: ({ row }) => <span>{row.original.userName}</span>,
	},
	{
		accessorKey: "gradeClass",
		header: "班级",
		cell: ({ row }) => <span>{row.original.gradeClass}</span>,
	},
	{
		accessorKey: "keywords",
		header: "预警关键词",
		cell: ({ row }) => (
			<span className="line-clamp-1 max-w-56 text-destructive">
				{row.original.keywords.length > 0
					? row.original.keywords.join("、")
					: "--"}
			</span>
		),
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
				{dayjs
					.unix(row.original.lastConversationTime)
					.format("YYYY-MM-DD HH:mm")}
			</span>
		),
	},
	{
		accessorKey: "status",
		header: "处理状态",
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				// TODO: 等后端给出枚举值后动态设置文字颜色
				<span className={cn("font-medium", "text-destructive")}>
					{statusLabelMap.get(status) || status}
				</span>
			);
		},
	},
	{
		accessorKey: "actions",
		header: "操作",
		cell: ({ row }) => (
			<>
				<Button variant={"link"} className="text-destructive" asChild>
					<Link
						to="/unit/users/$id"
						params={{ id: row.original.id }}
						className="cursor-pointer border-none bg-transparent text-sm text-gradient-2 hover:underline"
					>
						<EyeIcon />
						查看详情
					</Link>
				</Button>
				<StudentRemarkAction
					data-theme="danger"
					userId={row.original.id}
					remark={row.original.remark}
				/>
			</>
		),
	},
];
