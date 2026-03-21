import z from "zod";
import { request } from "@/lib/request";
import { tokenStore } from "@/lib/utils";
import { userStore } from "@/store/user";
import type { UserInfo } from "../common/type";
import { AuthCodeType } from "../common/constant";

// get user info
export const getUserInfo = (userId: string) =>
	request<{
		user: UserInfo;
	}>({
		url: "/user/get_info",
		method: "GET",
		params: {
			userId,
		},
	});

// sign-in
export const SignInRequestSchema = z.object({
	unitId: z.string(),
	authId: z.string(),
	authType: z.enum(AuthCodeType),
	verifyCode: z.string(),
});

export const requestUserSignIn = async (
	data: z.infer<typeof SignInRequestSchema>,
) => {
	const { token, userId } = await request<{
		token: string;
		userId: string;
	}>({
		url: "/user/sign_in",
		method: "POST",
		data,
	});
	tokenStore.set(token);
	const { user } = await getUserInfo(userId);
	userStore.getState().setUser(user);
};
