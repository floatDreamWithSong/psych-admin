import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CardHeaderTitle, CardLayout } from "@/components/layouts/card-layout";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import {
	NormalTable,
	type NormalTableQueryFn,
} from "@/components/common/normal-table";
import { useStore } from "zustand";
import { userStore } from "@/store/user";
import { useState } from "react";
import {
	EmotionLevel,
	EmotionLevelLabel,
	ProcessStatus,
} from "@/apis/common/constant";
import { getAlarmList } from "@/apis/dashboard/alarm";
import { alarmUserColumns, type AlarmUserRow } from "../data/alarm-user-column";

const AlarmUserTable = () => {
	const unitId = useStore(userStore, (state) => state.user!.unitId);
	const [emotionLevel, setEmotionLevel] = useState<EmotionLevel | "all">("all");
	const [status, setStatus] = useState<ProcessStatus | "all">("all");
	const [keyword, setKeyword] = useState("");

	const tableKey = [
		"unit-alarm-list",
		unitId,
		emotionLevel,
		status,
		keyword,
	].join("|");

	const queryFn: NormalTableQueryFn<AlarmUserRow> = async ({
		pageIndex,
		pageSize,
	}) => {
		const { records, pagination } = await getAlarmList({
			unitId,
			emotion: emotionLevel === "all" ? undefined : emotionLevel,
			status: status === "all" ? undefined : status,
			keyword: keyword.trim().length > 0 ? keyword.trim() : undefined,
			paginationOptions: {
				page: pageIndex + 1,
				limit: pageSize,
			},
		});

		return {
			data: records.map((record) => ({
				id: record.id,
				userId: record.user.id,
				emotion: record.emotion,
				userName: record.user.name,
				userCode: record.user.code,
				gradeClass: `${record.user.grade}年级 ${record.user.class}班`,
				keywords: record.keywords,
				totalConversationRounds: record.totalConversationRounds,
				lastConversationTime: record.lastConversationTime,
				remark: record.user.remark,
				status: record.status,
			})),
			total: "total" in pagination ? pagination.total : records.length,
		};
	};

	return (
		<CardLayout variant="area" className="mt-5.25">
			<div className="flex justify-between flex-wrap gap-2">
				<CardHeaderTitle variant="light">高风险用户详情</CardHeaderTitle>
				<div className="flex gap-3 flex-wrap">
					<Select
						value={emotionLevel.toString()}
						onValueChange={(value) => {
							if (value === "all") {
								setEmotionLevel("all");
							} else {
								setEmotionLevel(Number(value) as EmotionLevel);
							}
						}}
					>
						<Label>情绪类型</Label>
						<SelectTrigger>
							<SelectValue placeholder="全部类型" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">全部类型</SelectItem>
							{Object.values(EmotionLevel).map((emotionLevel) => (
								<SelectItem key={emotionLevel} value={emotionLevel.toString()}>
									{EmotionLevelLabel[emotionLevel]}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						value={status.toString()}
						onValueChange={(value) => {
							if (value === "all") {
								setStatus("all");
							} else {
								setStatus(Number(value) as ProcessStatus);
							}
						}}
					>
						<Label>处理状态</Label>
						<SelectTrigger>
							<SelectValue placeholder="全部状态" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">全部状态</SelectItem>
							<SelectItem value={ProcessStatus.PENDING.toString()}>
								待处理
							</SelectItem>
							<SelectItem value={ProcessStatus.PROCESSED.toString()}>
								已处理
							</SelectItem>
						</SelectContent>
					</Select>
					<InputGroup className="max-w-50">
						<InputGroupInput
							placeholder="搜索用户关键词"
							value={keyword}
							onChange={(event) => setKeyword(event.target.value)}
						/>
						<InputGroupAddon align={"inline-end"}>
							<SearchIcon />
						</InputGroupAddon>
					</InputGroup>
				</div>
			</div>
			<NormalTable<AlarmUserRow>
				key={tableKey}
				className="p-0 mt-5"
				columns={alarmUserColumns}
				queryFn={queryFn}
				queryKey={[
					"unit-alarm-list",
					unitId,
					emotionLevel.toString(),
					status.toString(),
					keyword,
				]}
				paginationPosition="inside"
				shadowStyle="none"
			/>
		</CardLayout>
	);
};

export default AlarmUserTable;
