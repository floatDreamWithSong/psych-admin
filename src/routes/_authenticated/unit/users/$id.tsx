import UserRecords from "@/components/features/user-records";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/unit/users/$id")({
	component: RouteComponent,
	validateSearch: (p: { needAlarm?: boolean }) => p,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { needAlarm } = Route.useSearch();
	return <UserRecords userId={id} data-theme={needAlarm ? "danger" : "cool"} />;
}
