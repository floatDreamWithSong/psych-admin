import { GradeLabel } from "@/apis/common/constant";
import { getUnitConversationList } from "@/apis/dashboard/conversation-record";
import {
	NormalTable,
	type NormalTableQueryFn,
} from "@/components/common/normal-table";
import { CardHeaderTitle, CardLayout } from "@/components/layouts/card-layout";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import {
	unitConversationColumns,
	type UnitConversationRow,
} from "./data/unit-conv-columns";

export const Route = createFileRoute("/_authenticated/unit/records/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { unitId } = useRouteContext({ from: "/_authenticated/unit" });

	const queryFn: NormalTableQueryFn<UnitConversationRow> = async ({
		pageIndex,
		pageSize,
	}) => {
		const { conversationList, pagination } = await getUnitConversationList({
			unitId,
			paginationOptions: {
				page: pageIndex + 1,
				limit: pageSize,
			},
		});

		return {
			data: conversationList.map((item) => ({
				convId: item.convId,
				userId: item.user.id,
				userCode: item.user.code,
				userName: item.user.name,
				gradeClass:
					item.user.grade !== undefined && item.user.class !== undefined
						? `${GradeLabel[item.user.grade]} ${item.user.class}班`
						: "--",
				title: item.title,
				time: item.time,
				needAlarm: item.needAlarm,
			})),
			total: "total" in pagination ? pagination.total : conversationList.length,
		};
	};

	return (
		<CardLayout variant="layout">
			<div className="flex items-center justify-between">
				<CardHeaderTitle>单位对话记录列表</CardHeaderTitle>
			</div>
			<NormalTable<UnitConversationRow>
				className="p-0 mt-6"
				columns={unitConversationColumns}
				queryFn={queryFn}
				queryKey={["unit-conversation-records", unitId]}
				paginationPosition="outside"
				shadowStyle="default"
			/>
		</CardLayout>
	);
}
