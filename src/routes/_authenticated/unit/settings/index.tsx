import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/unit/settings/")({
	component: RouteComponent,
});

function RouteComponent() {
	// TODO: 单位设置
	return <div>Hello "/_authenticated/unit/settings/"!</div>;
}
