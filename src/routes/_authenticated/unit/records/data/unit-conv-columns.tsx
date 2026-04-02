import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";

export interface UnitConversationRow {
	convId: string;
	userId: string;
	userCode: string;
	userName: string;
	gradeClass: string;
	title: string;
	time: number;
	needAlarm: boolean;
}

export const unitConversationColumns: Array<ColumnDef<UnitConversationRow>> = [
	{
		accessorKey: "needAlarm",
		header: "风险状态",
		cell: ({ row }) => (
			<span
				className={cn(
					"inline-flex min-w-14 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
					row.original.needAlarm ? "bg-destructive" : "bg-[#96C0FF]",
				)}
			>
				{row.original.needAlarm ? "需预警" : "正常"}
			</span>
		),
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
		accessorKey: "gradeClass",
		header: "班级",
		cell: ({ row }) => <span>{row.original.gradeClass || "--"}</span>,
	},
	{
		accessorKey: "title",
		header: "对话标题",
		cell: ({ row }) => (
			<span className="inline-block max-w-64 truncate align-bottom">
				{row.original.title || "--"}
			</span>
		),
	},
	{
		accessorKey: "time",
		header: "对话时间",
		cell: ({ row }) => (
			<span>{dayjs.unix(row.original.time).format("YYYY-MM-DD HH:mm")}</span>
		),
	},
	{
		accessorKey: "actions",
		header: "操作",
		cell: ({ row }) => (
			<Button variant="link" asChild>
				<Link
					to="/unit/records/$convId"
					params={{ convId: row.original.convId }}
					search={{ userId: row.original.userId }}
				>
					<EyeIcon className="size-4" />
					查看详情
				</Link>
			</Button>
		),
	},
];
