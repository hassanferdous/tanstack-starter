import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					title: "Hello World",
				});
			}, 1000);
		});
	},
	// staleTime: 1000,
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
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
});

function Home() {
	const { title } = Route.useLoaderData();
	return (
		<div className="p-2">
			<h3>{title}</h3>
		</div>
	);
}
