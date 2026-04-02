import { request } from "@/lib/request";
import type { BasicPagination, BasicPaginationOption } from "../common/type";
import type { MessageRole } from "../common/constant";

export const getConversationContent = (data: {
	conversationId: string;
	paginationOptions: BasicPaginationOption;
}) =>
	request<{
		pagination: BasicPagination;
		messageList: {
			content: string;
			role: MessageRole;
			index: number;
		}[];
	}>({
		url: "/conversation/get",
		method: "POST",
		data,
	});
