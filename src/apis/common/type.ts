import type { Gender, Grade, UserCodeType } from "./constant";

export interface BasicPaginationOption {
	limit: number;
	page: number;
}

export type BasicPagination =
	| {
			limit: number;
			page: number;
			total: number;
	  }
	| {
			hasNext: boolean;
			nextToken: string;
			limit: number;
	  };

export interface UserInfo {
	id: string;
	codeType: UserCodeType;
	code: string;
	unitId: string;
	name: string;
	birth: number;
	gender: Gender;
	status: string;
	enrollYear: number;
	grade: Grade;
	class: number;
	remark: string | null;
	options: Record<string, unknown> | null;
	createTime: number;
	updateTime: number;
	deleteTime: number;
	role: number;
}

export type User = UserInfo;
