import * as React from "react";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/layout/header";
import { QueryClient } from "@tanstack/react-query";
import NotFound from "@/components/ui/not-found";

interface AuthState {
	isAuthenticated: boolean;
	user: {
		id: string;
		username: string;
		email: string;
		roles: string[];
		permissions: string[];
	} | null;
	hasRole: (role: string) => boolean;
	hasAnyRole: (roles: string[]) => boolean;
	hasPermission: (permission: string) => boolean;
	hasAnyPermission: (permissions: string[]) => boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

export interface MyRouterContext {
	queryClient: QueryClient;
	auth: AuthState;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});
export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				title: "TanStack Router Starter",
			},
			{
				name: "description",
				content: "TanStack Router Starter",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
	context: () => ({
		queryClient,
	}),
	component: RootComponent,
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<React.Fragment>
			<HeadContent />
			<TanStackRouterDevtools />
			<Outlet />
		</React.Fragment>
	);
}
