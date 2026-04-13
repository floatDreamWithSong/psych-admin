import { getConversationContent } from "@/apis/conversation";
import {
	getReport,
	getUserConversationList,
} from "@/apis/dashboard/conversation-record";
import { CardHeaderTitle, CardLayout } from "@/components/layouts/card-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import malePng from "@/assets/imgs/male.png";
import femalePng from "@/assets/imgs/female.png";
import { Gender, MessageRole } from "@/apis/common/constant";
import { cn } from "@/lib/utils";
import { generateInfoItems } from "@/lib/info-item";
import InfoItem from "@/components/features/info-item";
import PanelCharts from "@/components/common/charts";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import BigAvatar from "@/components/features/big-avatar";
import { Fragment, useCallback, useMemo, useRef } from "react";
import useObserveReachBottom from "@/hooks/use-observe-reach-bottom";
import { Skeleton } from "@/components/ui/skeleton";

const CONVERSATION_MESSAGES_PAGE_SIZE = 80;

export const Route = createFileRoute("/_authenticated/unit/records/$convId")({
	component: RouteComponent,
	validateSearch: (p: { userId: string }) => p,
});

function RouteComponent() {
	const { userId } = Route.useSearch();
	const { convId } = Route.useParams();
	const messagesScrollRef = useRef<HTMLDivElement>(null);
	const { data } = useQuery({
		queryKey: ["user-records", userId],
		queryFn: async () => {
			const data = await getUserConversationList({
				userId,
				paginationOptions: {
					page: 1,
					limit: 10000,
				},
			});
			return data;
		},
	});
	const infoItems = generateInfoItems(data);
	const {
		data: conversationPages,
		isLoading: isConversationLoading,
		hasNextPage: hasMoreMessages,
		isFetchingNextPage: isFetchingMoreMessages,
		fetchNextPage: fetchMoreMessages,
	} = useInfiniteQuery({
		queryKey: ["unit-conversation-conversation", convId],
		initialPageParam: 1,
		queryFn: async ({ pageParam }) =>
			getConversationContent({
				conversationId: convId,
				paginationOptions: {
					page: pageParam,
					limit: CONVERSATION_MESSAGES_PAGE_SIZE,
				},
			}),
		getNextPageParam: (lastPage) => {
			const { pagination } = lastPage;
			if ("page" in pagination) {
				const loadedCount = pagination.page * pagination.limit;
				return loadedCount < pagination.total ? pagination.page + 1 : undefined;
			}
			return undefined;
		},
	});
	const messageList = useMemo(
		() =>
			conversationPages?.pages
				.slice()
				.reverse()
				.flatMap((page) => [...page.messageList].reverse()) ?? [],
		[conversationPages?.pages],
	);
	const setLoadMoreMessagesRef = useObserveReachBottom({
		root: messagesScrollRef,
		enabled: Boolean(hasMoreMessages) && !isFetchingMoreMessages,
		rootMargin: "0px 0px 160px 0px",
		onReachBottom: useCallback(() => {
			if (!hasMoreMessages || isFetchingMoreMessages) return;
			void fetchMoreMessages();
		}, [fetchMoreMessages, hasMoreMessages, isFetchingMoreMessages]),
	});
	const { data: report } = useQuery({
		queryKey: ["unit-conversation-report", convId],
		queryFn: () => getReport({ conversationId: convId }),
	});
	return (
		<CardLayout variant="layout">
			<div className="flex items-center justify-between">
				<CardHeaderTitle>对话详情</CardHeaderTitle>
			</div>
			<CardLayout variant="area" className="w-full mt-6">
				<CardHeaderTitle variant="light">用户信息</CardHeaderTitle>
				<article className="h-fit w-full flex flex-wrap gap-15 mt-6">
					<section className="size-47">
						<BigAvatar gender={data?.user.gender} />
					</section>
					<section className="grid grid-cols-3 w-115">
						{infoItems.map((item) => (
							<InfoItem key={item.label} {...item} />
						))}
					</section>
					{report && (
						<section className="grow">
							<div className="flex flex-row flex-wrap justify-between">
								<div>
									<p className="text-sm leading-7.5 text-[#4F4F4F]">
										内容摘要：
									</p>
									<p className="text-sm leading-7.5 max-w-80">
										{report.digest}
									</p>
								</div>
								<div>
									<p className="text-sm leading-7.5 text-[#4F4F4F]">
										关键词云：
									</p>
									<PanelCharts.WordCloud
										borderStyle="none"
										className="w-86 p-0"
										containerClassName="h-32"
										fontRange={[14, 35]}
										datas={Object.entries(report.keywordPercent).map(
											([item, weight]) => ({
												text: item,
												weight,
											}),
										)}
									/>
								</div>
							</div>
						</section>
					)}
				</article>
			</CardLayout>
			<CardLayout variant="area" className="w-full mt-6">
				<CardHeaderTitle variant="light">对话记录</CardHeaderTitle>
				<div
					ref={messagesScrollRef}
					className="max-h-180 space-y-6 mt-6 overflow-y-auto pr-2 pt-3 overflow-gradient"
					style={{ scrollbarWidth: "thin" }}
				>
					{isConversationLoading ? (
						<div className="space-y-6">
							{Array.from({ length: 4 }).map((_, index) => (
								<Skeleton key={index} className="h-20 w-full rounded-lg" />
							))}
						</div>
					) : (
						<>
							{messageList.map((message) => {
								if (!message.content?.trim()) {
									return <Fragment key={message.index} />;
								}
								const isUser = message.role === MessageRole.USER;
								return (
									<div
										key={message.index}
										className={cn(
											"justify-start flex",
											isUser ? "flex-row" : "flex-row-reverse",
										)}
									>
										<Avatar className="size-12">
											<AvatarImage
												src={
													isUser
														? data?.user.gender === Gender.MALE
															? malePng
															: femalePng
														: "/icon.svg"
												}
											/>
											<AvatarFallback>{isUser ? "M" : "A"}</AvatarFallback>
										</Avatar>
										<div
											className={cn(
												"max-w-3/4 py-3 px-6 rounded-lg shadow-xs",
												isUser
													? "ml-3 bg-[#EDEEFF]"
													: "mr-3 shadow-[3.6px_3.6px_14.4px_#E9F1FC] backdrop-blur-5px",
											)}
										>
											<span className="text-sm leading-7.5 text-[#3B3B53]">
												{message.content}
											</span>
										</div>
									</div>
								);
							})}
							<div
								ref={setLoadMoreMessagesRef}
								className="flex min-h-4 justify-center py-2"
							/>
						</>
					)}
				</div>
			</CardLayout>
			{report && (
				<>
					<CardLayout variant="area" className="w-full mt-6 space-y-6">
						<CardHeaderTitle variant="light" className="mb-6">
							对话分析
						</CardHeaderTitle>
						<CardLayout
							variant="card"
							className="w-full flex-col text-[#3B3B53]"
						>
							<CardHeaderTitle variant="secondary" className="text-black">
								总体评估
							</CardHeaderTitle>
							<Streamdown caret="block">{report?.body}</Streamdown>
						</CardLayout>
						<div className="flex justify-between gap-6">
							<CardLayout variant="card" className="grow flex-col">
								<CardHeaderTitle variant="secondary" className="text-black">
									主要话题
								</CardHeaderTitle>
								<div className="flex flex-wrap gap-4 pt-2">
									{report.topics.map((topic) => (
										<div
											className="text-sm leading-7.5 bg-[#EDEEFF] px-4 py-2 rounded-lg inline-block"
											key={topic}
										>
											{topic}
										</div>
									))}
								</div>
							</CardLayout>
							<CardLayout variant="card" className="grow-3">
								<CardHeaderTitle variant="secondary">
									建议与反馈
								</CardHeaderTitle>
							</CardLayout>
						</div>
					</CardLayout>
					<div className="w-full mt-6 justify-center flex">
						<Button variant="detail-gradient" size={"larger"} className="px-16">
							导出对话报告
						</Button>
					</div>
				</>
			)}
		</CardLayout>
	);
}
