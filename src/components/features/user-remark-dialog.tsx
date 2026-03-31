// import { updateAlarm } from "@/apis/dashboard/alarm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import type { UserRemark } from "@/apis/common/type";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import dayjs from "dayjs";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import useDialogState from "@/hooks/use-dialog-state";
import { PencilLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// import { ProcessStatus } from "@/apis/common/constant";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "../ui/select";
import { createRemark } from "@/apis/dashboard/user-manage";
import { useStore } from "zustand";
import { userStore } from "@/store/user";

export function UserRemarkDialog({
	userId,
	initialRemark,
	// initialStatus,
	// open,
	// onOpenChange,
}: {
	userId: string;
	initialRemark?: UserRemark | null;
	// initialStatus?: ProcessStatus;
}) {
	const [dialogState, setDialogState] = useDialogState<"remark">();
	const queryClient = useQueryClient();
	const form = useForm<{
		remark: string;
	}>({
		defaultValues: {
			remark: initialRemark?.content ?? "",
		},
	});

	const unitId = useStore(userStore, (st) => st.user!.unitId);

	const remarkMutation = useMutation({
		mutationFn: (remark: string) =>
			createRemark({
				userId,
				unitId,
				remark,
			}),
		onSuccess: () => {
			toast.success("备注更新成功");
			setDialogState(null);
			queryClient.invalidateQueries({
				predicate: (query) => {
					const [queryKey] = query.queryKey;
					return (
						typeof queryKey === "string" &&
						(queryKey.startsWith("unit-alarm-list|") ||
							queryKey.startsWith("unit-student-users|"))
					);
				},
			});
		},
		onError: () => {
			toast.error("备注更新失败");
		},
	});
	return (
		<Dialog
			open={dialogState === "remark"}
			onOpenChange={(open) => setDialogState(open ? "remark" : null)}
		>
			<DialogTrigger asChild>
				<Button variant={"link"} className={cn("text-black")}>
					<PencilLineIcon className="size-3.5" />
					添加备注
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>添加备注</DialogTitle>
					<p className="text-xs text-muted-foreground">
						最近修改时间：
						{initialRemark?.time
							? dayjs.unix(initialRemark.time).format("YYYY-MM-DD HH:mm")
							: "--"}
					</p>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit((data) => {
							remarkMutation.mutate(data.remark);
						})}
					>
						<FormField
							control={form.control}
							name="remark"
							rules={{
								required: "请输入备注内容",
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>备注内容</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											rows={6}
											placeholder="请输入备注内容"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									取消
								</Button>
							</DialogClose>
							<Button type="submit" disabled={remarkMutation.isPending}>
								提交
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

// export function StudentRemarkAction({
// 	userId,
// 	remark,
// 	initialStatus,
// 	variant = "link",
// 	className,
// 	...props
// }: {
// 	userId: string;
// 	remark?: UserRemark | null;
// 	initialStatus?: ProcessStatus;
// } & React.ComponentProps<typeof Button>) {
// 	const [dialogState, setDialogState] = useDialogState<"remark">();
// 	const open = dialogState === "remark";

// 	return (
// 		<>
// 			<Button
// 				variant={variant}
// 				className={cn("text-black", className)}
// 				onClick={() => setDialogState("remark")}
// 				{...props}
// 			>
// 				<PencilLineIcon className="size-3.5" />
// 				添加备注
// 			</Button>
// 			<UserRemarkDialog
// 				userId={userId}
// 				initialRemark={remark}
// 				initialStatus={initialStatus}
// 				open={open}
// 				onOpenChange={(nextOpen) => setDialogState(nextOpen ? "remark" : null)}
// 			/>
// 		</>
// 	);
// }
