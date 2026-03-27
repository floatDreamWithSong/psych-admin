import routerGuards from "@/lib/router-guards";
import { userStore } from "@/store/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/unit")({
	beforeLoad: routerGuards.requireUnit,
	context() {
		return {
			unitId: userStore.getState().user!.unitId,
		};
	},
});
