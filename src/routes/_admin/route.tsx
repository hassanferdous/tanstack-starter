import { AppSidebar } from "@/components/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/_admin")({
	component: RouteComponent,
	beforeLoad: ({ location, context }) => {
		// check if user is authenticated
		// if not, redirect to login
		// if yes, continue
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href } as any,
			});
		}
	},
});

function RouteComponent() {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<Outlet />
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
