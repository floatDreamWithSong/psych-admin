import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/unit/records/")({
	component: () => {
		// TODO: 单位对话记录列表
		return <div>单位对话记录列表</div>;
	},
});
