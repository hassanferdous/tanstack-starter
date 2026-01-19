// about.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/about")({
	component: AboutComponent,
	head: () => ({
		meta: [
			{
				title: "About | TanStack Router Starter",
			},
			{
				name: "description",
				content: "About | TanStack Router Starter",
			},
		],
	}),
});

function AboutComponent() {
	return (
		<div>
			<div className="container">About</div>
		</div>
	)
}
