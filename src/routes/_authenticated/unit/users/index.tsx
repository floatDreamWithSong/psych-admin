import {
	createFileRoute,
	useNavigate,
	useRouteContext,
} from "@tanstack/react-router";
import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import PeopleIcon from "@/components/icons/people";
import "./user.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getClassList } from "@/apis/dashboard/user-manage";
import { Grade, GradeLabel } from "@/apis/common/constant";

export const Route = createFileRoute("/_authenticated/unit/users/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { unitId } = useRouteContext({ from: "/_authenticated/unit" });
	const { data } = useQuery({
		queryKey: ["unit-users"],
		queryFn: async () => {
			return await getClassList({
				unitId,
			});
		},
	});
	return (
		<CardLayout variant="layout">
			<div className="flex items-center justify-between">
				<CardHeaderTitle>用户管理</CardHeaderTitle>
				<div className="flex gap-3 flex-wrap">
					<Select>
						<Label>年级</Label>
						<SelectTrigger>
							<SelectValue placeholder="全部年级" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">全部年级</SelectItem>
						</SelectContent>
					</Select>
					<Select>
						<Label>班级</Label>
						<SelectTrigger>
							<SelectValue placeholder="全部班级" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">全部班级</SelectItem>
						</SelectContent>
					</Select>
					<InputGroup className="max-w-50">
						<InputGroupInput placeholder="搜索用户关键词" />
						<InputGroupAddon align={"inline-end"}>
							<SearchIcon />
						</InputGroupAddon>
					</InputGroup>
				</div>
			</div>
			{data && data.grades.map((i) => <GradeArea key={i.grade} data={i} />)}
		</CardLayout>
	);
}
const GradeArea = ({
	data,
}: {
	data: Awaited<ReturnType<typeof getClassList>>["grades"][number];
}) => {
	const { classes, grade } = data;
	const [isOpen, setIsOpen] = useState(false);
	return (
		<CardLayout variant="area" className="mt-10">
			<CardHeaderTitle variant="light">{GradeLabel[grade]}</CardHeaderTitle>
			<div
				className={cn(
					"user-grid mt-6 p-1",
					!isOpen && "max-h-110 overflow-hidden",
				)}
			>
				{classes.map((classData) => (
					<ClassCard key={classData.class} data={classData} grade={grade} />
				))}
			</div>
			<div className="flex justify-center mt-3">
				<Button
					variant={"link"}
					className={cn(!isOpen && "text-gradient-2")}
					onClick={() => setIsOpen((v) => !v)}
				>
					{isOpen ? "收起" : "展开"}
					{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
				</Button>
			</div>
		</CardLayout>
	);
};

const ClassCard = ({
	data,
	grade,
}: {
	data: Awaited<
		ReturnType<typeof getClassList>
	>["grades"][number]["classes"][number];
	grade: Grade;
}) => {
	const navigate = useNavigate();
	return (
		<div
			className="h-51 round-shadow overflow-hidden cursor-pointer"
			onClick={() => {
				navigate({
					to: "/unit/users/students",
					search: {
						grade: grade,
						class: data.class,
					},
				});
			}}
		>
			<div className="class-card h-30 flex items-start justify-end">
				<div className="pr-6 pt-3 [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div>span]:text-sm">
					<div>
						<PeopleIcon />
						<span>用户总数:{data.userNum}人</span>
					</div>
					<div data-theme="danger">
						<PeopleIcon />
						<span>高风险用户:{data.alarmNum}人</span>
					</div>
				</div>
			</div>
			<div className="ml-6 mt-3">
				<p className="text-lg leading-6.25">
					{GradeLabel[grade]}（{data.class}）班
				</p>
				<div className="text-sm text-[#6D6D6D] space-x-5.5 leading-7.5">
					<span>班主任：{data.teacherName}</span>
					<span>联系方式：{data.teacherPhone}</span>
				</div>
			</div>
		</div>
	);
};
