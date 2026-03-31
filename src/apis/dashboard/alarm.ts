import { request } from "@/lib/request";
import type {
	BasicPagination,
	BasicPaginationOption,
	User,
	// UserInfo,
} from "../common/type";
import type { Emotion, ProcessStatus } from "../common/constant";

export interface AlarmOverview {
	pending: number;
	pendingChange: number;
	processed: number;
	processedChange: number;
	total: number;
	totalChange: number;
	track: number;
	trackChange: number;
}

export interface CoreapiAlarmRecord {
	/**
	 * 情绪状态
	 */
	emotion: string;
	/**
	 * 唯一Id
	 */
	id: string;
	/**
	 * 关键词列表
	 */
	keywords: string[];
	/**
	 * 上次对话时间（分钟时间戳）
	 */
	lastConversationTime: number;
	/**
	 * 处理状态
	 */
	status: ProcessStatus;
	/**
	 * 总对话轮数
	 */
	totalConversationRounds: number;
	/**
	 * 用户信息
	 */
	user: User;
}

// 数据总览
export const getAlarmOverview = (data: { unitId: string }) =>
	request<AlarmOverview>({
		url: "/dashboard/alarm_overview",
		method: "POST",
		data,
	});

//  高风险用户列表
export const getAlarmList = (data: {
	unitId: string;
	emotion?: Emotion;
	keyword?: string;
	paginationOptions: BasicPaginationOption;
	status?: ProcessStatus;
}) =>
	request<{
		pagination: BasicPagination;
		records: CoreapiAlarmRecord[];
	}>({
		url: "/dashboard/alarm_records",
		method: "POST",
		data,
	});

export const updateAlarm = (data: {
	id: string;
	// emotion?: Emotion;
	// kewords?: string[];
	status?: ProcessStatus;
	// user?: Pick<UserInfo, "remark">;
}) =>
	request({
		url: "/dashboard/update_alarm",
		method: "POST",
		data: {
			alarm: data,
		},
	});
