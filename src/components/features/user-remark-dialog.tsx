import { updateAlarm } from "@/apis/dashboard/alarm";
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
import { useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import useDialogState from "@/hooks/use-dialog-state";
import { PencilLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function UserRemarkDialog({
	userId,
	initialRemark,
	open,
	onOpenChange,
}: {
	userId: string;
	initialRemark?: UserRemark | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const queryClient = useQueryClient();
	const form = useForm<UserRemark>({
		defaultValues: initialRemark ?? { time: dayjs().unix(), content: "" },
	});

	useEffect(() => {
		if (!open) {
			return;
		}

		form.reset(initialRemark ?? { time: dayjs().unix(), content: "" });
	}, [form, initialRemark, open]);

	const remarkMutation = useMutation({
		mutationFn: (remark: UserRemark) =>
			updateAlarm({
				id: userId,
				user: {
					remark: {
						...remark,
						time: dayjs().unix(),
					},
				},
			}),
		onSuccess: () => {
			toast.success("备注更新成功");
			onOpenChange(false);
			void queryClient.invalidateQueries({
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
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>添加备注</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit((data) => {
							remarkMutation.mutate(data);
						})}
					>
						<FormField
							control={form.control}
							name="content"
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
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
							>
								取消
							</Button>
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

export function StudentRemarkAction({
	userId,
	remark,
	variant = "link",
	className,
	...props
}: {
	userId: string;
	remark?: UserRemark | null;
} & React.ComponentProps<typeof Button>) {
	const [dialogState, setDialogState] = useDialogState<"remark">();
	const open = dialogState === "remark";

	return (
		<>
			<Button
				variant={variant}
				className={cn("text-black", className)}
				onClick={() => setDialogState("remark")}
				{...props}
			>
				<PencilLineIcon className="size-3.5" />
				添加备注
			</Button>
			<UserRemarkDialog
				userId={userId}
				initialRemark={remark}
				open={open}
				onOpenChange={(nextOpen) => setDialogState(nextOpen ? "remark" : null)}
			/>
		</>
	);
}
