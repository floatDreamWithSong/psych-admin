import {
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { CardLayout } from "@layouts/card-layout";
import { cn } from "@/lib/utils";
import { MessageSquareIcon } from "lucide-react";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
} from "@tanstack/react-table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export type NormalTableQueryFn<T> = (
	pagination: PaginationState,
) => Promise<{ data: T[]; total: number }>;

interface NormalTableProps<T> {
	columns: ColumnDef<T>[];
	initPaginationState: PaginationState;
	queryKey: string[] | string;
	queryFn: NormalTableQueryFn<T>;
	pageSizeOptions?: number[];
	paginationPosition?: "inside" | "outside";
	shadowStyle?: "none" | "default";
}

interface PaginationState {
	pageIndex: number;
	pageSize: number;
}

export function NormalTable<T>({
	columns,
	className,
	queryFn,
	queryKey,
	initPaginationState,
	paginationPosition = "inside",
	shadowStyle = "default",
	pageSizeOptions = initPaginationState
		? [initPaginationState.pageSize]
		: [10, 20],
	...props
}: React.ComponentProps<"div"> & NormalTableProps<T>) {
	const [pagination, setPagination] =
		useState<PaginationState>(initPaginationState);
	const { pageIndex, pageSize } = pagination;

	const { data, isLoading, isError, error } = useQuery({
		queryKey: [
			typeof queryKey === "string" ? queryKey : queryKey.join("|"),
			pageIndex,
			pageSize,
		],
		queryFn: () => queryFn({ pageIndex, pageSize }),
		placeholderData: keepPreviousData,
		initialData: {
			data: [],
			total: 0,
		},
	});

	const table = useReactTable({
		data: data.data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: { pagination },
		onPaginationChange: setPagination,
		rowCount: data.total,
		manualPagination: true,
	});

	const total = data.total;
	const page = pageIndex + 1;
	const size = pageSize;
	const totalPages = Math.ceil(total / size);
	const items = useMemo(() => {
		const items: (number | "...")[] = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) items.push(i);
		} else {
			items.push(1);
			if (page > 4) items.push("...");
			const start = Math.max(2, page - 1);
			const end = Math.min(totalPages - 1, page + 1);
			for (let i = start; i <= end; i++) items.push(i);
			if (page < totalPages - 3) items.push("...");
			items.push(totalPages);
		}
		return items;
	}, [page, totalPages]);
	return (
		<CardLayout
			{...props}
			className={cn(
				paginationPosition === "inside" && [
					"px-7 py-5 overflow-x-auto",
					shadowStyle === "default" && "round-shadow",
					className,
				],
			)}
		>
			<Table
				containerClassName={cn(
					paginationPosition === "outside" && [
						"px-7 py-5",
						shadowStyle === "default" && "round-shadow",
						className,
					],
				)}
			>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="border-b border-table-separator hover:bg-transparent"
						>
							{headerGroup.headers.map((header) => (
								<TableHead
									className="text-center text-sm font-normal h-12"
									key={header.id}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isLoading ? (
						Array.from({ length: size }).map((_, index) => (
							<TableRow key={`skeleton-${index}`}>
								<TableCell colSpan={columns.length} className="text-center">
									<Skeleton className="h-8 w-full" />
								</TableCell>
							</TableRow>
						))
					) : isError ? (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="text-center text-destructive"
							>
								加载失败: {error instanceof Error ? error.message : "未知错误"}
							</TableCell>
						</TableRow>
					) : table.getRowModel().rows.length === 0 ? (
						<TableRow>
							<TableCell colSpan={columns.length} className="text-center">
								<Empty>
									<EmptyHeader>
										<EmptyMedia variant="icon">
											<MessageSquareIcon />
										</EmptyMedia>
										<EmptyTitle>暂无数据</EmptyTitle>
										<EmptyDescription>这里空空如也~</EmptyDescription>
									</EmptyHeader>
								</Empty>
							</TableCell>
						</TableRow>
					) : (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA]"
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell className="text-center text-sm h-12" key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			{/* Pagination */}
			<div className="flex items-center justify-end gap-2 pt-4 text-sm flex-wrap">
				<span className="inline-block min-w-fit">共{total}条</span>
				<Pagination className="mx-0 w-auto">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault();
									if (page > 1) table.previousPage();
								}}
								className={cn(page <= 1 && "pointer-events-none opacity-40")}
							/>
						</PaginationItem>
						{items.map((p, idx) => (
							<PaginationItem
								key={typeof p === "number" ? p : `ellipsis-${idx}`}
							>
								{p === "..." ? (
									<PaginationEllipsis />
								) : (
									<PaginationLink
										href="#"
										isActive={p === page}
										onClick={(e) => {
											e.preventDefault();
											table.setPageIndex(p - 1);
										}}
									>
										{p}
									</PaginationLink>
								)}
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault();
									if (page < totalPages) table.nextPage();
								}}
								className={cn(
									page >= totalPages && "pointer-events-none opacity-40",
								)}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
				<Select
					value={String(size)}
					onValueChange={(val) => table.setPageSize(Number(val))}
				>
					<SelectTrigger className="h-8 w-auto gap-1 text-sm rounded-none border-none bg-pagination-input-bg">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{pageSizeOptions.map((size) => (
							<SelectItem key={size} value={String(size)}>
								{size}条/页
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<div className="min-w-fit space-x-2">
					<span>前往</span>
					<PageJumpInput
						page={page}
						totalPages={totalPages}
						onJump={(p) => table.setPageIndex(p - 1)}
					/>
					<span>页</span>
				</div>
			</div>
		</CardLayout>
	);
}

function PageJumpInput({
	page,
	totalPages,
	onJump,
}: {
	page: number;
	totalPages: number;
	onJump: (page: number) => void;
}) {
	const [value, setValue] = useState(String(page));

	useEffect(() => {
		setValue(String(page));
	}, [page]);

	const commit = () => {
		const target = Number(value);
		if (Number.isInteger(target) && target >= 1 && target <= totalPages) {
			onJump(target);
		} else {
			setValue(String(page));
		}
	};

	return (
		<Input
			className="w-12 min-w-12 h-8 text-center text-sm px-1 bg-pagination-input-bg rounded-none border-none"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onBlur={commit}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					commit();
					(e.target as HTMLInputElement).blur();
				}
			}}
		/>
	);
}
