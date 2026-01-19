import * as React from "react";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/layout/header";
import { QueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface MyRouterContext {
	queryClient: QueryClient;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: async ({ queryKey }) => {
				const { data } = await axiosInstance.get(queryKey[0] as string);
				return data;
			},
			staleTime: 60 * 1000,
		},
	},
});
export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootComponent,
	context: () => ({
		queryClient,
	}),
});

function RootComponent() {
	return (
		<React.Fragment>
			<HeadContent />
			<Header />
			<TanStackRouterDevtools />
			<Outlet />
		</React.Fragment>
	);
}
