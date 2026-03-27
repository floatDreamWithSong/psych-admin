import UserRecords from "@/components/features/user-records";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/unit/users/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	return <UserRecords userId={id} />;
}
