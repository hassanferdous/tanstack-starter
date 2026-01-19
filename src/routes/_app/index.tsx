import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
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
	loader: async () => {
		return {
			title: "Home",
		}
	},
	// staleTime: 1000,
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
	component: Home,
});

function Home() {
	const { title } = Route.useLoaderData();
	return (
		<div className="p-2">
			<div className="container">
				<h3>{title}</h3>
			</div>
		</div>
	)
}
