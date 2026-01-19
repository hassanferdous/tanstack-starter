import { useAuth } from "@/auth";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Admin page",
			},
			{
				property: "og:title",
				content: "Admin page",
			},
		],
	}),
});

function RouteComponent() {
	const { hasRole } = useAuth();
	const isAdmin = hasRole("admin");
	return (
		<div>
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">
									Building Your Application
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Fetching</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="px-4">
				<h1 className="mb-3">Admin page</h1>
				{isAdmin && (
					<div className="p-6 bg-red-50 rounded">
						<h2>Sensitive data. Only admin can see this</h2>
						<p>Total earnings</p>
						<p>$100</p>
					</div>
				)}
			</div>
		</div>
	);
}
