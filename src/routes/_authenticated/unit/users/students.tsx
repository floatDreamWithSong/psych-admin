import { Gender, GradeLabel, RiskLevel } from "@/apis/common/constant";
import { getUserList } from "@/apis/dashboard/user-manage";
import {
	NormalTable,
	type NormalTableQueryFn,
} from "@/components/common/normal-table";
import { CardHeaderTitle, CardLayout } from "@/components/layouts/card-layout";
import { Label } from "@/components/ui/label";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	createFileRoute,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { StudentColumns, type StudentUserRow } from "./data/student-column";

export const Route = createFileRoute("/_authenticated/unit/users/students")({
	component: RouteComponent,
	validateSearch: (params: { class?: number; grade?: number }) => {
		return params;
	},
});

function RouteComponent() {
	const { unitId } = useRouteContext({ from: "/_authenticated/unit" });
	const [gender, setGender] = useState<Gender | "all">("all");
	const [level, setLevel] = useState<number | "all">("all");
	const [keyword, setKeyword] = useState("");
	const { grade = 0, class: classId = 0 } = useSearch({
		from: "/_authenticated/unit/users/students",
	});

	const tableKey = [
		"unit-student-users",
		unitId,
		grade,
		classId,
		gender,
		level,
		keyword.trim(),
	].join("|");

	const queryFn: NormalTableQueryFn<StudentUserRow> = async ({
		pageIndex,
		pageSize,
	}) => {
		const { riskUsers, pagination } = await getUserList({
			unitId,
			grade,
			class: classId,
			gender: gender === "all" ? undefined : gender,
			level: level === "all" ? undefined : level,
			keyword: keyword.trim() ? keyword.trim() : undefined,
			paginationOptions: {
				page: pageIndex + 1,
				limit: pageSize,
			},
		});

		return {
			data: riskUsers.map((item) => ({
				id: item.user.id,
				userCode: item.user.code,
				userName: item.user.name,
				gender: item.user.gender,
				gradeClass: `${GradeLabel[grade]} ${item.user.class}班`,
				level: item.level,
				keywords: item.keywords,
				totalConversationRounds: item.totalConversationRounds,
				lastConversationTime: item.lastConversationTime,
			})),
			total: "total" in pagination ? pagination.total : riskUsers.length,
		};
	};

	return (
		<CardLayout variant="layout">
			<div className="flex items-center justify-between gap-3 flex-wrap">
				<CardHeaderTitle>用户管理</CardHeaderTitle>
				<div className="flex gap-3 flex-wrap">
					<Select
						value={gender.toString()}
						onValueChange={(value) => {
							if (value === "all") {
								setGender("all");
								return;
							}
							setGender(Number(value) as Gender);
						}}
					>
						<Label>性别</Label>
						<SelectTrigger>
							<SelectValue placeholder="全部性别" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">全部性别</SelectItem>
							<SelectItem value={Gender.MALE.toString()}>男</SelectItem>
							<SelectItem value={Gender.FEMALE.toString()}>女</SelectItem>
							<SelectItem value={Gender.OTHER.toString()}>其他</SelectItem>
						</SelectContent>
					</Select>
					<Select
						value={level.toString()}
						onValueChange={(value) => {
							if (value === "all") {
								setLevel("all");
								return;
							}
							setLevel(Number(value));
						}}
					>
						<Label>风险等级</Label>
						<SelectTrigger>
							<SelectValue placeholder="全部等级" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">全部等级</SelectItem>
							<SelectItem value={RiskLevel.NORMAL.toString()}>正常</SelectItem>
							<SelectItem value={RiskLevel.LOW.toString()}>低风险</SelectItem>
							<SelectItem value={RiskLevel.MEDIUM.toString()}>
								中风险
							</SelectItem>
							<SelectItem value={RiskLevel.HIGH.toString()}>高风险</SelectItem>
						</SelectContent>
					</Select>
					<InputGroup className="max-w-52">
						<InputGroupInput
							placeholder="搜索姓名/学号/关键词"
							value={keyword}
							onChange={(event) => setKeyword(event.target.value)}
						/>
						<InputGroupAddon align={"inline-end"}>
							<SearchIcon />
						</InputGroupAddon>
					</InputGroup>
				</div>
			</div>
			<NormalTable<StudentUserRow>
				key={tableKey}
				className="p-0 mt-6"
				columns={StudentColumns}
				queryFn={queryFn}
				queryKey={[
					"unit-student-users",
					unitId,
					grade.toString(),
					classId.toString(),
					gender.toString(),
					level.toString(),
					keyword.trim(),
				]}
				paginationPosition="outside"
				shadowStyle="default"
			/>
		</CardLayout>
	);
}
