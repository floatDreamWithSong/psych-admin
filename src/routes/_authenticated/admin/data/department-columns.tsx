import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export interface PanelData {
	departmentType: string;
	departmentName: string;
	departmentLabel: string;
	totalUser: number;
	avgConversationDuration: number;
	highRiskUserCount: number;
	lastUpdateTime: string;
}

export const departmentColumns: Array<ColumnDef<PanelData>> = [
	{
		accessorKey: "departmentType",
		header: "单位类型",
		cell: ({ row }) => {
			const type = row.original.departmentType;
			return (
				<span
					className={cn(
						"inline-block px-2.5 py-0.5 text-xs font-medium text-white w-14 h-5 rounded-full bg-gradient-2",
					)}
				>
					{type}
				</span>
			);
		},
	},
	{
		accessorKey: "departmentName",
		header: "单位名称",
		cell: ({ row }) => {
			return <span>{row.original.departmentName}</span>;
		},
	},
	{
		accessorKey: "departmentLabel",
		header: "单位性质",
		cell: ({ row }) => {
			return <span>{row.original.departmentLabel}</span>;
		},
	},
	{
		accessorKey: "totalUser",
		header: "用户总数",
		cell: ({ row }) => {
			return <span>{row.original.totalUser}</span>;
		},
	},
	{
		accessorKey: "avgConversationDuration",
		header: "平均对话时长",
		cell: ({ row }) => {
			return <span>{row.original.avgConversationDuration}min</span>;
		},
	},
	{
		accessorKey: "highRiskUserCount",
		header: "高风险用户数",
		cell: ({ row }) => {
			return (
				<span className="font-medium text-destructive">
					{row.original.highRiskUserCount}
				</span>
			);
		},
	},
	{
		accessorKey: "lastUpdateTime",
		header: "最近更新时间",
		cell: ({ row }) => {
			return <span>{row.original.lastUpdateTime}</span>;
		},
	},
	{
		accessorKey: "actions",
		header: "操作",
		cell: ({ row }) => {
			return (
				<Link
					to="/admin/panel/detail/$id"
					params={{ id: row.original.departmentName }}
					className="cursor-pointer text-gradient-2 hover:underline text-sm bg-transparent border-none"
				>
					查看详情
				</Link>
			);
		},
	},
];
