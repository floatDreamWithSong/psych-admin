import { request } from "@/lib/request";
import type { BasicPagination, BasicPaginationOption } from "../common/type";

export interface TrendPoint {
	date: string;
	count: number;
}

export interface Keyword {
	word: string;
	weight: number;
}
export interface ConvDetail {
	time: number;
	digest: string;
	keywords: Keyword[];
}

export const getUserConversationList = (data: {
	userId: string;
	paginationOptions: BasicPaginationOption;
}) =>
	request<{
		user: {
			userId: string;
			userName: string;
			avatar: string;
			grade: string;
			school: string;
		};
		userConvTrend: {
			trendPoints: TrendPoint[];
		};
		convDetail: ConvDetail[];
		pagination: BasicPagination;
	}>({
		url: "/dashboard/user_conversation_records",
		method: "POST",
		data,
	});

export const getReport = (data: { conversationId: string }) =>
	request<{
		title: string;
		keywords: string[];
		digest: string;
		emotion: string;
		body: string;
		needAlarm: boolean;
	}>({
		url: "/dashboard/get_report",
		method: "POST",
		data,
	});

// TODO: 等待单位报表接口实现
export const getUnitConversationList = (data: { unitId: string }) =>
	request({
		url: "/dashboard/unit_conversation_records",
		method: "POST",
		data,
	});
