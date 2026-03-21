import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_errors/404")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_errors/404"!</div>;
}
