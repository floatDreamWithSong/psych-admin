import { request } from "@/lib/request";
import type {
	ConversationDuration,
	Emotion,
	RiskGender,
	RiskLevel,
} from "../common/constant";

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

export interface CoreapiRiskDistribution {
	count: number;
	// 0=all 1=male 2=female
	gender: RiskGender;
	// 1-4: High | Medium | Low | Normal
	level: RiskLevel;
}

export const getPsychTrend = (data: DashboardRequest) =>
	request<{
		emotionRatio: {
			ratio: Record<`${Emotion}`, number>;
			total: number;
		};
		keywords: {
			keywordMap: Record<string, number>;
			keywTotal: number;
		};
		risks: CoreapiRiskDistribution[];
	}>({
		url: "/dashboard/psych_trend",
		method: "POST",
		data,
	});

export interface Point {
	week: number;
	hour: number;
	count: number;
}

export interface Duration {
	key: ConversationDuration;
	count: number;
}

export interface ConvDistribution {
	ratio: Record<"1" | "2" | "3", number>;
	total: number;
}

export const getDataTrend = (data: Partial<DashboardRequest>) =>
	request<{
		activePoints: Point[];
		conversationDurations: Duration[];
		conversationPoints: Point[];
		convDistribution: ConvDistribution;
	}>({
		url: "/dashboard/trend",
		method: "POST",
		data,
	});

export interface DashboardUnit {
	id: string;
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
