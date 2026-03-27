import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { requestUserSignIn, SignInRequestSchema } from "@/apis/user";
import { AuthCodeType } from "@/apis/common/constant";

export const Route = createFileRoute("/(auth)/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({ from: "/sign-in" });
	const form = useForm<z.infer<typeof SignInRequestSchema>>({
		resolver: zodResolver(SignInRequestSchema),
		defaultValues: {
			unitId: "",
			authId: "",
			verifyCode: "",
			authType: AuthCodeType.PASSWORD,
		},
	});
	const signInMutation = useMutation({
		mutationFn: requestUserSignIn,
		onSuccess: () => {
			toast.success("登录成功");
			navigate({ to: "/" });
		},
		onError: () => {
			toast.error("登录失败");
		},
	});
	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit((data) => {
					signInMutation.mutate(data);
				})}
			>
				<FormField
					control={form.control}
					name="unitId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<FormLabel>单位ID</FormLabel>
							</FormLabel>
							<FormControl>
								<Input {...field} placeholder="请输入单位ID" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="authId"
					render={({ field }) => (
						<FormItem>
							<FormLabel aria-required>账号</FormLabel>
							<FormControl>
								<Input {...field} placeholder="请输入账号" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="verifyCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel aria-required>密码</FormLabel>
							<FormControl>
								<InputGroup>
									<InputGroupInput
										required
										{...field}
										placeholder="请输入密码"
									/>
									<InputGroupButton>
										<EyeIcon />
									</InputGroupButton>
								</InputGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					登录
				</Button>
			</form>
			<div className="fixed bottom-0 text-center text-sm text-muted-foreground p-2">
				<div>超管：13800009999，SuperAdmin@2026</div>
				<div>单位测试：69bfb8c0f80ebaf6192169f6，13900000001， UnitAdmin@1</div>
			</div>
		</Form>
	);
}
