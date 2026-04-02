import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import { Button } from "@/components/ui/button";
import PanelCharts from "@/components/common/charts";
import dayjs from "dayjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	getUserConversationList,
	type ConvDetail,
} from "@/apis/dashboard/conversation-record";
import { formatWeek } from "@/lib/format";
import { generateInfoItems } from "@/lib/info-item";
import InfoItem from "./info-item";
import { Link } from "@tanstack/react-router";
import { createContext, memo, useCallback, useContext, useRef } from "react";
import useObserveReachBottom from "@/hooks/use-observe-reach-bottom";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import BigAvatar from "./big-avatar";

interface UserRecordsProps {
	userId: string;
}

const userRecordContext = createContext({
	userId: "",
});

export default function UserRecords({
	userId,
	variant = "layout",
	...props
}: React.ComponentProps<typeof CardLayout> & UserRecordsProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ["user-records-infinite", userId],
			initialPageParam: 1,
			queryFn: async ({ pageParam }) =>
				getUserConversationList({
					userId,
					paginationOptions: {
						page: pageParam,
						limit: 10,
					},
				}),
			getNextPageParam: (lastPage) => {
				const { pagination } = lastPage;
				if ("page" in pagination) {
					const loadedCount = pagination.page * pagination.limit;
					return loadedCount < pagination.total
						? pagination.page + 1
						: undefined;
				}

				return undefined;
			},
		});
	const firstPage = data?.pages[0];
	const infoItems = generateInfoItems(firstPage);
	const detailList = data?.pages.flatMap((page) => page.convDetail) ?? [];
	const setLoadMoreRef = useObserveReachBottom({
		root: scrollContainerRef,
		enabled: Boolean(hasNextPage) && !isFetchingNextPage,
		rootMargin: "0px 0px 160px 0px",
		onReachBottom: useCallback(() => {
			if (!hasNextPage || isFetchingNextPage) return;
			void fetchNextPage();
		}, [fetchNextPage, hasNextPage, isFetchingNextPage]),
	});

	return (
		<CardLayout variant={variant} {...props}>
			<CardHeaderTitle>对话记录</CardHeaderTitle>
			<CardLayout variant="area" className="mt-6 pb-10.5">
				<CardHeaderTitle variant="light" className="pb-5.5">
					用户信息
				</CardHeaderTitle>
				<article className="h-fit w-full flex flex-wrap gap-15">
					<section className="size-47">
						<BigAvatar gender={firstPage?.user.gender} />
					</section>
					<section className="grid grid-cols-3 w-115">
						{infoItems.map((item) => (
							<InfoItem key={item.label} {...item} />
						))}
					</section>
					<section className="grow">
						<p className="text-sm leading-7.5 text-[#4F4F4F]">
							近一周对话频率趋势：
						</p>
						<PanelCharts.ActivityChart
							type="line"
							borderStyle="none"
							className="h-fit p-0"
							containerClassName="h-38"
							config={{
								value: {
									label: "对话频率",
								},
							}}
							datas={
								firstPage?.userConvTrend.trendPoints?.map((item) => ({
									day: formatWeek(item.week),
									date: item.week,
									value: item.count,
								})) || []
							}
						/>
					</section>
				</article>
			</CardLayout>
			<CardLayout variant="area" className="mt-5">
				<CardHeaderTitle variant="light" className="pb-5.5">
					对话详情
				</CardHeaderTitle>
				<div
					ref={scrollContainerRef}
					className="max-h-180 space-y-5.5 overflow-y-auto pr-2 overflow-gradient"
					style={{
						scrollbarWidth: "thin",
					}}
				>
					<userRecordContext.Provider value={{ userId }}>
						{isLoading ? (
							<div className="space-y-5.5">
								{Array.from({ length: 3 }).map((_, index) => (
									<Skeleton key={index} className="h-48 w-full rounded-2xl" />
								))}
							</div>
						) : detailList.length ? (
							<>
								{detailList.map((item) => (
									<DetailCard
										key={`${item.conversationId}-${item.time}`}
										item={item}
									/>
								))}
								<div
									ref={setLoadMoreRef}
									className="flex justify-center py-2"
								/>
							</>
						) : (
							<Empty className="border-none py-10">
								<EmptyHeader>
									<EmptyTitle>暂无对话记录</EmptyTitle>
									<EmptyDescription>这里空空如也~</EmptyDescription>
								</EmptyHeader>
							</Empty>
						)}
					</userRecordContext.Provider>
				</div>
			</CardLayout>
		</CardLayout>
	);
}

const DetailCard = memo(({ item }: { item: ConvDetail }) => {
	const { userId } = useContext(userRecordContext);
	return (
		<CardLayout
			variant="card"
			className="w-full flex flex-wrap gap-20 pt-4 pb-7 pl-6.75 pr-5.5"
		>
			<div className="space-y-1.25 h-fit">
				<p className="text-gradient-1-2 text-lg leading-7.5 font-bold">
					对话时间：{dayjs.unix(item.time).format("YYYY.MM.DD HH:mm")}
				</p>
				<p className="text-lg leading-7.5">内容摘要：</p>
				<p className="text-[#838383] max-w-165 text-sm">{item.digest}</p>
			</div>
			<div>
				<p className="text-lg mb-2 leading-7.5">关键词词云：</p>
				<PanelCharts.WordCloud
					borderStyle="none"
					className="w-86 p-0"
					containerClassName="h-32"
					fontRange={[14, 35]}
					datas={Object.entries(item.keywords.keywordMap).map(
						([word, weight]) => ({
							text: word,
							weight: weight,
						}),
					)}
				/>
			</div>
			<div className="grow flex items-end justify-end">
				<Button variant="detail-gradient" size={"larger"} asChild>
					<Link
						to="/unit/records/$convId"
						search={{ userId }}
						params={{ convId: item.conversationId }}
					>
						查看详情
					</Link>
				</Button>
			</div>
		</CardLayout>
	);
});
