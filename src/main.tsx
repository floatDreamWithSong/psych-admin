import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";
import reportWebVitals from "./integrations/reportWebVitals.ts";
import { getContext } from "./integrations/tanstack-query/root-provider.tsx";
import { routeTree } from "./routeTree.gen.ts";

const TanStackQueryProviderContext = getContext();

const router = createRouter({
	routeTree,
	context: TanStackQueryProviderContext,
	scrollRestoration: true,
	defaultPreload: "intent",
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	defaultViewTransition: true,
	defaultNotFoundComponent: () => <div>404</div>,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={TanStackQueryProviderContext.queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>,
	);
}

reportWebVitals();
