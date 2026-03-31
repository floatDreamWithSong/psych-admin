import { request } from "@/lib/request";
import type {
	BasicPagination,
	BasicPaginationOption,
	UserInfo,
} from "../common/type";
import type { Grade } from "../common/constant";

interface ClassItem {
	alarmNum: number;
	class: number;
	teacherName: string;
	teacherPhone: string;
	userNum: number;
}

export const getClassList = (data: { unitId: string }) =>
	request<{
		grades: {
			classes: ClassItem[];
			grade: Grade;
		}[];
	}>({
		url: "/dashboard/classes",
		method: "POST",
		data,
	});

export const getUserList = (data: {
	unitId: string;
	grade?: number;
	class?: number;
	level?: number;
	gender?: number;
	keyword?: string;
	paginationOptions: BasicPaginationOption;
}) =>
	request<{
		pagination: BasicPagination;
		riskUsers: {
			keywords: string[];
			lastConversationTime: number;
			level: number;
			totalConversationRounds: number;
			user: UserInfo;
		}[];
	}>({
		url: "/dashboard/users",
		method: "POST",
		data,
	});

export const createRemark = (data: {
	userId: string;
	unitId: string;
	remark: string;
}) =>
	request({
		url: "/dashboard/create_remark",
		method: "POST",
		data,
	});
