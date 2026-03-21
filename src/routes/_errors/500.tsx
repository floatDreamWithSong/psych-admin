import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_errors/500")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_errors/general-error"!</div>;
}
