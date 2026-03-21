import { request } from "@/lib/request";

interface DashboardRequest {
	unitId: string;
}

export interface DashboardGetDataOverviewResp {
	totalUsers: number;
	weeklyIncreaseUsers: number;
	weeklyIncreaseUsersRate: number;
	activeUsers?: number;
	weeklyIncreaseActiveUsers?: number;
	weeklyIncreaseActiveUsersRate?: number;
	totalConversations: number;
	weeklyIncreaseConversations: number;
	weeklyIncreaseConversationsRate: number;
	averageTimePerConversation: number;
	weeklyIncreaseAverageTimePerConversation: number;
	weeklyIncreaseAverageTimePerConversationRate: number;
	alarmUsers: number;
	weeklyIncreaseAlarmUsers: number;
	weeklyIncreaseAlarmUsersRate: number;
	totalUnits?: number;
	weeklyIncreaseUnits?: number;
	weeklyIncreaseUnitsRate?: number;
}

export const getDataOverView = (data: DashboardRequest) =>
	request<DashboardGetDataOverviewResp>({
		url: "/dashboard/overview",
		method: "POST",
		data,
	});

export interface CoreapiKeyword {
	count: number;
	keyword: string;
}

export interface CoreapiRiskDistribution {
	count: number;
	/**
	 * 0=all 1=male 2=female
	 */
	gender: number;
	/**
	 * 0=正常 1=低危 2=中危 3=高危
	 */
	level: number;
}

export interface EmotionRatio {
	danger: number; // 危险情绪占比
	negative: number; // 负面情绪占比
	neutral: number; // 中性情绪占比
	positive: number; // 正向情绪占比
}

export const getPsychTrend = (data: DashboardRequest) =>
	request<{
		emotionRatio: EmotionRatio;
		keywords: CoreapiKeyword[];
		risks: CoreapiRiskDistribution[];
	}>({
		url: "/dashboard/psych_trend",
		method: "POST",
		data,
	});

// TODO: 暂未实现
export const getDataTrend = (data: Partial<DashboardRequest>) =>
	request({
		url: "/dashboard/trend",
		method: "POST",
		data,
	});

export interface DashboardUnit {
	type: string;
	name: string;
	property: string;
	userCount: number;
	averageConversationMinutes: number;
	riskUserCount: number;
	updateTime: number;
}

export const getUnitList = () =>
	request<{
		units: DashboardUnit[];
	}>({
		url: "/dashboard/units",
		method: "POST",
	});
