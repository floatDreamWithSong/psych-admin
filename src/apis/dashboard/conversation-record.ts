import { request } from "@/lib/request";
import type {
	BasicPagination,
	BasicPaginationOption,
	UserInfo,
} from "../common/type";
import type { Emotion } from "../common/constant";

export interface TrendPoint {
	week: number;
	count: number;
}

export interface Keyword {
	word: string;
	weight: number;
}
export interface ConvDetail {
	conversationId: string;
	time: number;
	digest: string;
	keywords: {
		keywordMap: Record<string, number>;
		keyTotal: number;
	};
}

export const getUserConversationList = (data: {
	userId: string;
	paginationOptions: BasicPaginationOption;
}) =>
	request<{
		user: UserInfo;
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
		keywordPercent: Record<string, number>;
		digest: string;
		emotion: Emotion;
		body: string;
		needAlarm: boolean;
		reportId: string;
		reportStatus: number; // TODO: 等后端确认用处。
		suggestions: string[] | null; // 需ai生成，可能为空
		topics: string[];
	}>({
		url: "/dashboard/get_report",
		method: "POST",
		data,
	});

export const getUnitConversationList = (data: {
	unitId: string;
	paginationOptions: BasicPaginationOption;
}) =>
	request<{
		pagination: BasicPagination;
		conversationList: Array<{
			user: UserInfo;
			convId: string;
			title: string;
			time: number;
			needAlarm: boolean;
		}>;
	}>({
		url: "/dashboard/unit_conversation_records",
		method: "POST",
		data,
	});
