import routerGuards from "@/lib/router-guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/unit")({
	beforeLoad: routerGuards.requireUnit,
});
