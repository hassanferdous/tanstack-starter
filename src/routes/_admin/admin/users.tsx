import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/users")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div className="container">Users</div>
		</div>
	);
}
