import { request } from "@/lib/request";
import type {
	BasicPagination,
	BasicPaginationOption,
	User,
} from "../common/type";

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
			grade: number;
		}[];
	}>({
		url: "/dashboard/classes",
		method: "POST",
		data,
	});

export const getUserList = (data: {
	unitId: string;
	paginationOptions: BasicPaginationOption;
}) =>
	request<{
		pagination: BasicPagination;
		riskUsers: {
			keywords: string[];
			lastConversationTime: number;
			level: number;
			totalConversationRounds: number;
			user: Pick<User, "name" | "gender" | "class" | "code">;
		}[];
	}>({
		url: "/dashboard/users",
		method: "POST",
		data,
	});
