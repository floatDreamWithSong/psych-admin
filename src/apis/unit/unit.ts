import { request } from "@/lib/request";
import z from "zod";
import { AuthCodeType, Gender } from "../common/constant";

// sign-up
export const UnitSignUpSchema = z.object({
	phone: z.string(),
	password: z.string(),
	name: z.string(),
	address: z.string(),
	contact: z.string(),
	level: z.number(),
});

interface UnitWrapper<T> {
	unit: T;
}

export type Status = string;

export interface CoreapiUnit extends z.infer<typeof UnitSignUpSchema> {
	id: string;
	status: Status;
	createTime: string;
	deleteTime: string;
	updateTime: string;
}

export const requestUnitSignUp = (data: z.infer<typeof UnitSignUpSchema>) =>
	request<UnitWrapper<CoreapiUnit>>({
		url: "/unit/sign_up",
		method: "POST",
		data: {
			unit: data,
		},
	}).then((res) => res.unit);

// 获取信息
export const getUnitInfo = (params: { unitId: string }) =>
	request<UnitWrapper<CoreapiUnit>>({
		url: "/unit/get_info",
		method: "GET",
		params,
	}).then((res) => res.unit);

// 修改密码
export const PasswordUpdateSchema = z.object({
	authType: z.enum(AuthCodeType),
	id: z.string(),
	newPassword: z.string(),
	verifyCode: z.string(),
});

export const requestPasswordUpdate = (
	data: z.infer<typeof PasswordUpdateSchema>,
) =>
	request({
		url: "/unit/update_password",
		method: "POST",
		data,
	});

// 修改资料

export const UnitProfileSchema = z.object({
	id: z.string(),
	name: z.string(),
	address: z.string(),
	contact: z.string(),
});

export const requestProfileUpdate = (data: z.infer<typeof UnitProfileSchema>) =>
	request({
		url: "/unit/update_info",
		method: "POST",
		data: {
			unit: data,
		},
	});

// 将一个用户关联到单位
export const requestLinkUser = (data: { unitId: string; userId: string }) =>
	request({
		url: "/unit/link_user",
		method: "POST",
		data,
	});

// User: 指C端用户
export const UserSchema = z.object({
	code: z.string(),
	password: z.string(),
	name: z.string(),
	birth: z.number(),
	gender: z.enum(Gender),
	enrollYear: z.number(),
	class: 4,
});

//- codeType == "phone"：传入的code为手机号
//- codeType == "studentId"：传入的code为学号
type CodeType = "phone" | "studentId";

// 批量创建单位的用户，并自动关联
export const requestCreateAndLinkUser = (data: {
	unitId: string;
	codeType: CodeType;
	users: z.infer<typeof UserSchema>[];
}) =>
	request({
		url: "/unit/create_and_link_user",
		method: "POST",
		data: data,
	});
