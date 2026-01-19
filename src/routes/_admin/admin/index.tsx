import { useAuth } from "@/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { hasRole } = useAuth();
	const isAdmin = hasRole("admin");
	return (
		<div>
			<div className="container">
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
