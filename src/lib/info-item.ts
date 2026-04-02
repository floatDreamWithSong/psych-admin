import { GenderLabel, GradeLabel } from "@/apis/common/constant";
import type { getUserConversationList } from "@/apis/dashboard/conversation-record";
import dayjs from "dayjs";

export const generateInfoItems = (
	data: Awaited<ReturnType<typeof getUserConversationList>> | undefined,
) => {
	if (!data) return [];
	const totalConversationRounds =
		"total" in data.pagination ? data.pagination.total : data.convDetail.length;
	return [
		{
			label: "姓名",
			value: data?.user.name,
		},
		{
			label: "年级",
			value: data?.user.grade ? GradeLabel[data?.user.grade] : "-",
		},
		{
			label: "性别",
			value: data?.user.gender ? GenderLabel[data.user.gender] : "-",
		},
		{
			label: "班级",
			value: data?.user.class,
		},
		{
			label: "对话总轮数",
			value: totalConversationRounds,
		},
		{
			label: "上次对话时间",
			value: data?.convDetail[0]?.time
				? dayjs.unix(data?.convDetail[0]?.time).format("YYYY-MM-DD HH:mm")
				: "-",
		},
	];
};
