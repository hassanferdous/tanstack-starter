import { axiosInstance } from "@/lib/axios";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
	component: RouteComponent,
	loader: async () => {
		const response = await axiosInstance.get("/posts");
		return { data: response.data };
	},
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
	head: () => ({
		meta: [
			{
				title: "All Posts | TanStack Router Starter",
			},
			{
				name: "description",
				content: "All Posts | TanStack Router Starter",
			},
		],
	}),
});

function RouteComponent() {
	const { data } = Route.useLoaderData();
	return (
		<div>
			<div className="container py-6 text-center">
				<h1 className="text-3xl">All Posts</h1>
			</div>
			<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-20">
				{data?.posts?.map((post: any) => (
					<Link
						to={`/posts/${post.id}`}
						key={post.id}
						className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-xl font-semibold mb-2 capitalize">
							{post.title}
						</h2>
						<p className="text-muted-foreground line-clamp-3">
							{post.body}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
